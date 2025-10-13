from django.db import models
from django.utils import timezone
from user.models import User

# Create your models here.

class Project(models.Model):
    ProjectID = models.AutoField(primary_key=True, verbose_name="Project ID")
    Name = models.CharField(max_length=100, verbose_name="Name")
    Type = models.CharField(max_length=100, verbose_name="Type")
    Description = models.TextField(verbose_name="Description")
    URL = models.URLField(verbose_name="URL")
    
    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return f"Project {self.ProjectID}: {self.Type}"


class ProjectTeam(models.Model):
    ProjectID = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Project")
    UserID = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    Role = models.CharField(max_length=50, blank=True, null=True, verbose_name="Role")
    
    class Meta:
        verbose_name = "Project Team Member"
        verbose_name_plural = "Project Team Members"
        unique_together = ('ProjectID', 'UserID')  # Composite primary key equivalent
    
    def __str__(self):
        return f"{self.UserID} - {self.ProjectID} ({self.Role or 'No Role'})"


class Post(models.Model):
    """Model for entrepreneurial project idea posts"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    CATEGORY_CHOICES = [
        ('tech', 'Technology'),
        ('healthcare', 'Healthcare'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('retail', 'Retail'),
        ('food', 'Food & Beverage'),
        ('sustainability', 'Sustainability'),
        ('other', 'Other'),
    ]
    
    PostID = models.AutoField(primary_key=True, verbose_name="Post ID")
    Title = models.CharField(max_length=200, verbose_name="Title")
    Description = models.TextField(verbose_name="Description")
    Category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other', verbose_name="Category")
    TargetMarket = models.TextField(blank=True, null=True, verbose_name="Target Market")
    BusinessModel = models.TextField(blank=True, null=True, verbose_name="Business Model")
    FundingNeeds = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="Funding Needs ($)")
    Status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', verbose_name="Status")
    CreatedAt = models.DateTimeField(default=timezone.now, verbose_name="Created At")
    UpdatedAt = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    Author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', verbose_name="Author")
    
    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-CreatedAt']
    
    def __str__(self):
        return f"Post {self.PostID}: {self.Title} by {self.Author.first_name} {self.Author.last_name}"