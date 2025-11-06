import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Get API URL from app.json or use default
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  // Log request details for debugging
  console.log('API Request:', {
    url,
    method: options.method || 'GET',
    headers: { ...headers, Authorization: token ? `Token ${token.substring(0, 20)}...` : 'None' },
  });
  
  try {
    const response = await fetch(url, config);
    console.log('API Response:', {
      url,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
    });
    
    // Read response as text first (can only read once)
    const text = await response.text();
    const contentType = response.headers.get('content-type');
    
    // Try to parse as JSON if content-type suggests it
    let data;
    if (contentType && contentType.includes('application/json')) {
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error(`Server returned invalid JSON: ${response.status} ${response.statusText} - ${text.substring(0, 100)}`);
      }
    } else {
      // Not JSON, use text as data
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText} - ${text.substring(0, 100)}`);
      }
      return text;
    }
    
    if (!response.ok) {
      throw new Error(data.message || data.error || data.detail || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    // If it's already an Error object, re-throw it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, wrap it
    throw new Error(error.message || 'Network error occurred');
  }
};

// Authentication API
export const loginUser = async (email, password) => {
  return apiRequest('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (userData) => {
  return apiRequest('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getUserProfile = async () => {
  return apiRequest('/auth/user/');
};

// Posts API
export const getPublishedPosts = async () => {
  return apiRequest('/posts/published/');
};

export const getMyPosts = async () => {
  return apiRequest('/posts/my_posts/');
};

export const getPost = async (postId) => {
  return apiRequest(`/posts/${postId}/`);
};

export const createPost = async (postData) => {
  return apiRequest('/posts/', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

export const updatePost = async (postId, postData) => {
  return apiRequest(`/posts/${postId}/`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
};

export const deletePost = async (postId) => {
  return apiRequest(`/posts/${postId}/`, {
    method: 'DELETE',
  });
};

export const publishPost = async (postId) => {
  console.log('Publishing post with ID:', postId);
  try {
    const result = await apiRequest(`/posts/${postId}/publish/`, {
      method: 'POST',
    });
    console.log('Publish post success:', result);
    return result;
  } catch (error) {
    console.error('Publish post error details:', {
      postId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

