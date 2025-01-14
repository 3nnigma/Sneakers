

from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed
from django.forms import ValidationError
from django.http import JsonResponse
from rest_framework import viewsets, generics
from rest_framework.views import APIView
import stripe
from drf_project.settings import SECRET_KEY
from django.conf import settings
from rest_framework import status
from .models import Gender, Sneakers, User, Cart
from .serializers import GenderSerializer, SneakersSerializer, UserSerializer
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.pagination import PageNumberPagination
import jwt
from datetime import datetime, timedelta
from .serializers import CartSerializer


class GenderView(generics.ListCreateAPIView, generics.RetrieveDestroyAPIView):
  queryset = Gender.objects.all()
  serializer_class = GenderSerializer


class SneakersPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size' 
    max_page_size = 40 

class SneakersView(viewsets.ModelViewSet):
    queryset = Sneakers.objects.all()
    serializer_class = SneakersSerializer
    pagination_class = SneakersPagination  # По умолчанию пагинация включена
    filter_backends = [OrderingFilter]
    ordering_fields = ['price']

    def get_queryset(self):
        # Получаем запрос с параметрами
        queryset = super().get_queryset()

        # Получаем параметр no_pagination
        no_pagination = self.request.query_params.get('no_pagination', False)

        # Если параметр no_pagination = True, отключаем пагинацию
        if no_pagination:
            self.pagination_class = None  # Отключаем пагинацию
            return queryset

        return queryset

class RegisterView(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer


class LoginView(APIView):
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('User Not Found')

    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect Password')

    # Измененное создание JWT-токена
    payload = {
        'id': user.pk,
        'exp': datetime.utcnow() + timedelta(minutes=60),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    # Установка JWT-токена в куки
    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True)

    response.data = {
        'jwt': token
    }

    return response


class LogoutView(APIView):
  def post(self, request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message': 'success'
    }
    return response


# class UserView(APIView):
#   token = None

#   def get(self, request):
#     token = request.COOKIES.get("jwt")
#     print(token)
#     if not token:
#       raise AuthenticationFailed('Token not provided')

#     try:
#       payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#     except jwt.ExpiredSignatureError:
#       raise AuthenticationFailed('Unauthenticated! Token has expired')
#     except jwt.InvalidTokenError:
#       raise AuthenticationFailed('Invalid token')

#     user = User.objects.filter(id=payload['id']).first()

#     serializer = UserSerializer(user)
#     return Response(serializer.data)

#   def patch(self, request):
#     token_get = self.token
#     print(token_get)  # Но всё равно выводится None
#     try:
#       payload = jwt.decode(token_get, SECRET_KEY, algorithms=[  # type: ignore
#                            'HS256'])
#     except jwt.ExpiredSignatureError:
#       raise AuthenticationFailed('Unauthenticated! Token has expired')
#     except jwt.InvalidTokenError:
#       raise AuthenticationFailed('Invalid token')

#     user = User.objects.filter(id=payload['id']).first()

#     new_balance = request.data.get('balance')

#     if user.id is not None:
#       try:
#         user_instance = User.objects.get(id=user.id)
#         user_instance.balance = new_balance
#         user_instance.save()

#         serializer = UserSerializer(user_instance)
#         return JsonResponse(serializer.data)
#       except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#     else:
    # return Response({'error': 'User ID is missing'}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):

  def get_user_from_token(self, request):
    token = request.COOKIES.get("jwt")

    if not token:
      raise AuthenticationFailed('Token not provided')

    try:
      payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Unauthenticated! Token has expired')
    except jwt.InvalidTokenError:
      raise AuthenticationFailed('Invalid token')

    user = User.objects.filter(id=payload['id']).first()
    return user

  def get(self, request):
    user = self.get_user_from_token(request)
    serializer = UserSerializer(user)
    return Response(serializer.data)

  def patch(self, request):
    token = request.data.get('token')

    if not token:
      raise AuthenticationFailed('Token not provided')

    try:
      payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Unauthenticated! Token has expired')
    except jwt.InvalidTokenError:
      raise AuthenticationFailed('Invalid token')

    new_balance = request.data.get('balance')

    user_instance = get_object_or_404(User, id=payload['id'])
    user_instance.balance = new_balance
    user_instance.save()
    serializer = UserSerializer(user_instance)
    return JsonResponse(serializer.data)


class CartCreateView(generics.CreateAPIView, generics.RetrieveDestroyAPIView):
  queryset = Cart.objects.all()
  serializer_class = CartSerializer

  def get(self, request, *args, **kwargs):
    user_id = request.query_params.get('user')

    if not user_id:
      return Response({"error": "User ID is required in query parameters."}, status=400)

    try:
      user = User.objects.get(id=user_id)
    except User.DoesNotExist:
      return Response({"error": f"User with ID {user_id} does not exist."}, status=404)

    cart_items = user.cart_set.all()  # type: ignore
    serialized_data = CartSerializer(cart_items, many=True).data
    return Response(serialized_data)

  def perform_create(self, serializer):
    sneakers_id = self.request.data.get('sneakers_id')  # type: ignore
    quantity = self.request.data.get('quantity')  # type: ignore
    # type: ignore  # предполагается, что user передается в виде идентификатора
    user_id = self.request.data.get('user')  # type: ignore

    # Проверяем, что sneakers_id и user_id существуют
    if not Sneakers.objects.filter(id=sneakers_id).exists():
      raise ValidationError("Sneakers with provided ID does not exist.")

    if not User.objects.filter(id=user_id).exists():
      raise ValidationError("User with provided ID does not exist.")

    # Получаем объект пользователя
    user = User.objects.get(id=user_id)

    # Сохраняем запись в таблице Cart с указанием текущего пользователя
    serializer.save(user=user, sneakers_id=sneakers_id, quantity=quantity)


class CartDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Cart.objects.all()
  serializer_class = CartSerializer

class ClearCart(APIView):
  def delete(self, request):
      user_id = request.data.get("user_id")
      Cart.objects.filter(user=user_id).delete()
      return Response({"message": "Корзина очищена!"}, status=status.HTTP_204_NO_CONTENT)

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentIntentView(APIView):
    def post(self, request):
        try:
            amount = request.data.get('amount')
            amount_in_cents = int(float(amount) * 100)

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'Account Top-up',
                        },
                        'unit_amount': amount_in_cents,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=f'http://localhost:3000/payment/success',
                cancel_url=f'http://localhost:3000/',
            )
            return Response({'url': session.url}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)