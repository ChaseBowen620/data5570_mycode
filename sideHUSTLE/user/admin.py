from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('ANumber', 'FirstName', 'LastName', 'Email')
    list_filter = ('FirstName', 'LastName')
    search_fields = ('ANumber', 'FirstName', 'LastName', 'Email')
    ordering = ('LastName', 'FirstName')
