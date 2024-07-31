
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from api.views import CardView, CartCreateView, CartDetail, GenderView, RegisterView, LoginView, LogoutView, SneakersView, TransactionView, UserView

router = routers.SimpleRouter()
router.register(r'sneakers', SneakersView)
router.register(r'register', RegisterView)
router.register(r'transaction', TransactionView)
router.register(r'card', CardView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('gender/', GenderView.as_view(), name='gender'),
    path('api/cart/', CartCreateView.as_view(), name='cart-list-create'),
    path('api/cart/<int:pk>/', CartDetail.as_view(), name='cart-list-detail'),
]
