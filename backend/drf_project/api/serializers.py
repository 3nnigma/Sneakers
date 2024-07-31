
from rest_framework import serializers

from .models import Card, Cart, Gender, Sneakers, Transaction, User


class SneakersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Sneakers
    fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'first_name', 'last_name', 'balance',
              'email', 'password', 'gender']
  extra_kwargs = {
      'password': {'write_only': True}
  }

  def create(self, validate_data):
    password = validate_data.pop('password', None)
    isinstance = self.Meta.model(**validate_data)

    if password is not None:
      isinstance.set_password(password)
    isinstance.save()
    return isinstance


class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cart
    fields = '__all__'


class GenderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Gender
    fields = '__all__'
