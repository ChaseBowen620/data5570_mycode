from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('ANumber', 'first_name', 'last_name', 'email', 'username')
    list_filter = ('first_name', 'last_name', 'is_active', 'is_staff')
    search_fields = ('ANumber', 'first_name', 'last_name', 'email', 'username')
    ordering = ('last_name', 'first_name')
