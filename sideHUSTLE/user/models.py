from django.db import models

# Create your models here.

class User(models.Model):
    ANumber = models.CharField(max_length=20, unique=True, verbose_name="A-Number")
    Email = models.EmailField(unique=True, verbose_name="Email Address")
    Password = models.CharField(max_length=128, verbose_name="Password")
    FirstName = models.CharField(max_length=50, verbose_name="First Name")
    LastName = models.CharField(max_length=50, verbose_name="Last Name")
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def __str__(self):
        return f"{self.FirstName} {self.LastName} ({self.ANumber})"
