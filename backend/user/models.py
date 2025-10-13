from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    ANumber = models.CharField(max_length=20, unique=True, verbose_name="A-Number")
    email = models.EmailField(unique=True, verbose_name="Email Address")
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    
    # Use email as the username field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'ANumber', 'first_name', 'last_name']
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def __str__(self):
        return f"{self.FirstName} {self.LastName} ({self.ANumber})"
