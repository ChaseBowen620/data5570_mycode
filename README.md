# SideHUSTLE - Entrepreneurial Ideas Platform

A full-stack mobile application built with React Native (Expo) and Django REST Framework for sharing and discovering entrepreneurial business ideas.

## Features

- **User Authentication**: Secure login/registration system
- **Post Management**: Create, edit, publish, and manage entrepreneurial idea posts
- **Browse Ideas**: Discover published business ideas with search and filtering
- **Dark/Light Mode**: Theme switching with Redux state management
- **Responsive Design**: Modern UI with smooth navigation

## Tech Stack

### Frontend
- **React Native** with Expo
- **React Navigation** for screen navigation
- **Redux Toolkit** for state management
- **AsyncStorage** for data persistence
- **React Native Picker Select** for form inputs

### Backend
- **Django** with REST Framework
- **Token Authentication** for API security
- **PostgreSQL** database (SQLite for development)
- **Custom User Model** with additional fields

## Project Structure

```
data5570_mycode/
├── backend/                 # Django REST API
│   ├── sideHUSTLE/         # Main Django project
│   ├── user/               # Custom user app
│   ├── projects/           # Posts and projects app
│   └── manage.py
├── frontend/               # React Native app
│   ├── screens/            # App screens
│   ├── navigation/         # Navigation setup
│   ├── services/           # API services
│   ├── store/              # Redux store
│   ├── components/         # Reusable components
│   └── App.js
├── database/               # Database files
├── deployment/             # Deployment configs
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.8+
- Virtual environment (recommended)

### Backend Setup
```bash
cd backend
source /home/ubuntu/sideHUSTLEvenv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/user/` - Get current user
- `GET /api/posts/published/` - Get published posts
- `GET /api/posts/my_posts/` - Get user's posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{id}/` - Get post details
- `POST /api/posts/{id}/publish/` - Publish draft post

## Assignment Requirements Met

✅ **React Hooks**: Extensive use of `useState()` and `useEffect()` across all screens
✅ **Parent-Child Components**: Multiple component hierarchies (App → Navigator → Screens)
✅ **Navigation**: 7+ screens with complete navigation system using React Navigation
✅ **Redux Store**: Full Redux implementation with theme management, reducers, and dispatch

## Development

This project was created for a Data Science/AI App Building class assignment, demonstrating proficiency in:
- React Native development
- Full-stack application architecture
- State management with Redux
- API integration
- Modern mobile app design patterns

## License

This project is for educational purposes.
