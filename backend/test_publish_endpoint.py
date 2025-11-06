#!/usr/bin/env python3
"""
Test script for the publish endpoint
"""
import os
import sys
import django
import json
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import urllib.parse

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sideHUSTLE.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from projects.models import Post

User = get_user_model()

# API base URL
API_URL = "http://localhost:8000/api"

def test_publish_endpoint():
    print("=" * 60)
    print("Testing Publish Endpoint")
    print("=" * 60)
    
    # Step 1: Get or create a test user
    print("\n1. Getting/Creating test user...")
    try:
        user = User.objects.first()
        if not user:
            print("   No users found. Creating test user...")
            user = User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User'
            )
            print(f"   Created user: {user.username}")
        else:
            print(f"   Using existing user: {user.username}")
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        print(f"   Token: {token.key[:20]}...")
    except Exception as e:
        print(f"   ERROR: {e}")
        return
    
    # Step 2: Get draft posts
    print("\n2. Checking for draft posts...")
    try:
        draft_posts = Post.objects.filter(Author=user, Status='draft')[:5]
        if draft_posts.exists():
            print(f"   Found {draft_posts.count()} draft post(s)")
            for post in draft_posts:
                print(f"   - Post ID: {post.PostID}, Title: {post.Title[:50]}")
        else:
            print("   No draft posts found. Creating a test draft post...")
            # Create a draft post
            post = Post.objects.create(
                Author=user,
                Title="Test Post for Publishing",
                Description="This is a test post to verify the publish endpoint",
                Category="tech",
                Status="draft"
            )
            print(f"   Created draft post with ID: {post.PostID}")
            draft_posts = [post]
    except Exception as e:
        print(f"   ERROR: {e}")
        return
    
    # Step 3: Test the publish endpoint
    if draft_posts:
        test_post = draft_posts[0]
        print(f"\n3. Testing publish endpoint for Post ID: {test_post.PostID}")
        print(f"   Current Status: {test_post.Status}")
        
        url = f"{API_URL}/posts/{test_post.PostID}/publish/"
        headers = {
            'Authorization': f'Token {token.key}',
            'Content-Type': 'application/json'
        }
        
        try:
            print(f"   URL: {url}")
            print(f"   Method: POST")
            
            # Create request
            req = Request(url, method='POST')
            req.add_header('Authorization', f'Token {token.key}')
            req.add_header('Content-Type', 'application/json')
            
            try:
                with urlopen(req) as response:
                    status_code = response.getcode()
                    response_body = response.read().decode('utf-8')
                    
                    print(f"\n   Response Status: {status_code}")
                    print(f"   Response Headers: {dict(response.headers.items())}")
                    
                    try:
                        response_data = json.loads(response_body)
                        print(f"   Response Body: {json.dumps(response_data, indent=2)}")
                    except:
                        print(f"   Response Body (text): {response_body[:200]}")
                    
                    # Verify the post was updated
                    test_post.refresh_from_db()
                    print(f"\n4. Verifying post status after publish...")
                    print(f"   Post Status: {test_post.Status}")
                    
                    if status_code == 200 and test_post.Status == 'published':
                        print("\n✅ SUCCESS: Publish endpoint is working correctly!")
                    elif status_code == 200:
                        print(f"\n⚠️  WARNING: Endpoint returned 200 but post status is {test_post.Status}")
                    else:
                        print(f"\n❌ ERROR: Publish endpoint returned status {status_code}")
                        
            except HTTPError as e:
                status_code = e.code
                response_body = e.read().decode('utf-8')
                print(f"\n   Response Status: {status_code}")
                try:
                    error_data = json.loads(response_body)
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error Response (text): {response_body[:200]}")
                print(f"\n❌ ERROR: Publish endpoint returned status {status_code}")
                
        except URLError as e:
            print(f"\n❌ ERROR: Could not connect to backend server: {e}")
            print("   Make sure the backend is running: cd backend && ./start_server.sh")
        except Exception as e:
            print(f"\n❌ ERROR: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("\n⚠️  No draft posts available to test publish endpoint")
    
    print("\n" + "=" * 60)

if __name__ == '__main__':
    test_publish_endpoint()

