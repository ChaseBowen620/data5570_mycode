# API Serializers for JSON conversion
from rest_framework import serializers
from user.models import User  # Use custom User model
from projects.models import Project, Post  # Import both Project and Post models

class UserSerializer(serializers.ModelSerializer):
    """User serializer for API responses"""
    class Meta:
        model = User
        fields = ['id', 'username', 'ANumber', 'email', 'first_name', 'last_name', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        """Create user with hashed password"""
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user

class ProjectSerializer(serializers.ModelSerializer):
    """Project serializer for API responses"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = ['ProjectID', 'Name', 'Type', 'Description', 'URL']
        read_only_fields = ['ProjectID']


class PostSerializer(serializers.ModelSerializer):
    """Post serializer for API responses"""
    Author = UserSerializer(read_only=True)
    AuthorID = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Post
        fields = [
            'PostID', 'Title', 'Description', 'Category', 'TargetMarket', 
            'BusinessModel', 'FundingNeeds', 'Status', 'CreatedAt', 'UpdatedAt', 
            'Author', 'AuthorID'
        ]
        read_only_fields = ['PostID', 'CreatedAt', 'UpdatedAt', 'Author']
    
    def create(self, validated_data):
        """Create post with author from request user"""
        # Remove AuthorID if present (we'll use the authenticated user)
        validated_data.pop('AuthorID', None)
        return Post.objects.create(**validated_data)
