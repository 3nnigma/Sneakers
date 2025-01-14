
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from api.views import CartCreateView, CartDetail, GenderView, PaymentIntentView, RegisterView, LoginView, LogoutView, SneakersView, UserView, ClearCart

router = routers.SimpleRouter()
router.register(r'sneakers', SneakersView)
router.register(r'register', RegisterView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('gender/', GenderView.as_view(), name='gender'),
    path('api/cart/', CartCreateView.as_view(), name='cart-list-create'),
    path('api/cart/<int:pk>/', CartDetail.as_view(), name='cart-list-detail'),
    path('api/cart/clear/', ClearCart.as_view(), name='clear_cart'),
	 path('api/create-stripe-session/', PaymentIntentView.as_view(), name='create-payment-intent'),
]
