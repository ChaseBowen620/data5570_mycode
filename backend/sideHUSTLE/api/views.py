# API Views for Django REST Framework
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, ProjectSerializer, PostSerializer
from projects.models import Project, Post  # Import both Project and Post models
from user.models import User  # Use custom User model

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """User registration endpoint"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """User login endpoint"""
    email = request.data.get('email')
    password = request.data.get('password')
    
    if email and password:
        # Use Django's authenticate function with email as username
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key
            })
    
    return Response({'message': 'Invalid credentials'}, 
                   status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    """Get current user profile"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ProjectViewSet(viewsets.ModelViewSet):
    """Project CRUD operations"""
    queryset = Project.objects.all()  # Add queryset attribute
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Return projects for the authenticated user
        return Project.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Set the user when creating a project
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def user(self, request):
        """Get projects for the current user"""
        projects = self.get_queryset()
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """User read-only operations"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    """Post CRUD operations for entrepreneurial ideas"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return posts for the authenticated user or all published posts"""
        if self.action == 'list':
            # For list view, show all published posts
            return Post.objects.filter(Status='published').order_by('-CreatedAt')
        else:
            # For other actions, show user's own posts
            return Post.objects.filter(Author=self.request.user).order_by('-CreatedAt')
    
    def perform_create(self, serializer):
        """Set the author when creating a post"""
        serializer.save(Author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_posts(self, request):
        """Get posts for the current user"""
        posts = Post.objects.filter(Author=request.user).order_by('-CreatedAt')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get all published posts"""
        posts = Post.objects.filter(Status='published').order_by('-CreatedAt')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a draft post"""
        post = self.get_object()
        if post.Author != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        post.Status = 'published'
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)
