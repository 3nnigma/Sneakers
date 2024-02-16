
from django.contrib import admin


from .models import Cart, Category, Gender, Sneakers, User

admin.site.register(Sneakers)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Gender)
admin.site.register(Cart)
