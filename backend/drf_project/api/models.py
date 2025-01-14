from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models

# from django.contrib.auth.hashers import make_password


# class UserManager(BaseUserManager):
#   def create_user(self, email, username, firstname, lastname, password=None, **extra_fields):
#     if not email:
#       raise ValueError('The Email field must be set')
#     email = self.normalize_email(email)
#     user = self.model(email=email, username=username,
#                       firstname=firstname, lastname=lastname, **extra_fields)
#     user.set_password(make_password(password))
#     user.save(using=self._db)
#     return user

#   def create_superuser(self, email, username, firstname, lastname, password=None, **extra_fields):
#     extra_fields.setdefault('is_staff', True)
#     extra_fields.setdefault('is_superuser', True)

#     return self.create_user(email, username, firstname, lastname, password, **extra_fields)

# is_active = models.BooleanField(default=True)

# objects = UserManager()


class Gender(models.Model):
    gender = models.CharField(max_length=100)

    def __str__(self):
        return self.gender

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    gender = models.ForeignKey(Gender, on_delete=models.PROTECT, null=True)
    balance = models.IntegerField(default=0)
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


class Sneakers(models.Model):
    title = models.CharField(max_length=255)
    image = models.TextField()
    content = models.TextField(blank=True)
    price = models.IntegerField()
    cat = models.ForeignKey('Category', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sneakers_id = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username}'s cart - {self.quantity} x {self.sneakers_id}"