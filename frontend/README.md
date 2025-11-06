# SideHUSTLE Frontend

React Native mobile application built with Expo for sharing and discovering entrepreneurial business ideas.

## Features

- **User Authentication**: Secure login/registration with token-based authentication
- **Browse Ideas**: Discover published entrepreneurial ideas from the community
- **Create & Manage Posts**: Create, edit, publish, and manage your own entrepreneurial idea posts
- **Dark/Light Mode**: Toggle between themes with Redux state management
- **Responsive Design**: Modern UI with smooth navigation

## Tech Stack

- **React Native** with Expo
- **React Navigation** for screen navigation
- **Redux Toolkit** for state management
- **AsyncStorage** for data persistence
- **React Native Picker Select** for form inputs

## Project Structure

```
frontend/
├── screens/            # App screens
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── CreatePostScreen.js
│   ├── MyPostsScreen.js
│   ├── PostDetailScreen.js
│   └── ProfileScreen.js
├── navigation/         # Navigation setup
│   ├── AuthNavigator.js
│   └── MainNavigator.js
├── services/           # API services
│   └── api.js
├── store/              # Redux store
│   ├── store.js
│   ├── authSlice.js
│   └── themeSlice.js
├── components/         # Reusable components
│   ├── Button.js
│   ├── Input.js
│   └── PostCard.js
├── App.js              # Main app component
├── package.json
└── app.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone
   - Press `w` for web browser

## Configuration

### API URL

The API URL is configured in `app.json` under `extra.apiUrl`. By default, it's set to:
```
http://localhost:8000/api
```

For production or if your backend is running on a different host, update this value in `app.json`.

### Environment Setup

Make sure your Django backend is running on `http://localhost:8000` (or update the API URL in `app.json`).

## Usage

### Authentication Flow

1. **Register**: Create a new account with username, email, A-Number, first name, last name, and password
2. **Login**: Sign in with your email and password
3. **Auto-login**: The app automatically loads your saved authentication token on startup

### Creating Posts

1. Navigate to "My Posts" tab
2. Tap "+ New" button in the header
3. Fill in the post details:
   - Title (required)
   - Category (required)
   - Description (required)
   - Target Market (optional)
   - Business Model (optional)
   - Funding Needs (optional)
4. Save as draft or publish immediately

### Browsing Ideas

- View all published posts on the "Discover" tab
- Tap on any post to view full details
- Pull down to refresh the list

### Managing Your Posts

- View all your posts (drafts and published) in the "My Posts" tab
- Tap on a post to view details
- Publish draft posts from the detail screen
- Delete posts you own

### Theme Toggle

- Go to "Profile" tab
- Toggle "Dark Mode" switch to change theme
- Theme preference is saved in Redux state

## API Integration

The app communicates with the Django REST API backend. All API calls are handled through the `services/api.js` file.

### Endpoints Used

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/user/` - Get current user
- `GET /api/posts/published/` - Get published posts
- `GET /api/posts/my_posts/` - Get user's posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `POST /api/posts/{id}/publish/` - Publish draft post
- `DELETE /api/posts/{id}/` - Delete post

## Development

### Key Features Implemented

✅ React Hooks: Extensive use of `useState()` and `useEffect()` across all screens  
✅ Parent-Child Components: Component hierarchies throughout the app  
✅ Navigation: 7+ screens with complete navigation system  
✅ Redux Store: Full Redux implementation with theme and auth management  

### State Management

- **Auth State**: Handles user authentication, login, logout, and token management
- **Theme State**: Manages dark/light mode preference

### Navigation Structure

- **Auth Stack**: Login and Register screens
- **Main Tabs**: Three main tabs (Discover, My Posts, Profile)
- **Stack Navigators**: Nested navigation for each tab with detail screens

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Make sure your Django backend is running and accessible
2. **CORS Errors**: Ensure CORS is properly configured in Django settings
3. **Token Issues**: Clear app data or reinstall if authentication persists incorrectly

## License

This project is for educational purposes.


