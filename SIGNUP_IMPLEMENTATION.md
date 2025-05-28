# Signup Feature Implementation

## Overview
The signup feature has been implemented using Zustand for state management and integrates with the backend authentication API.

## Architecture

### State Management
- **Zustand Store**: `src/lib/stores/auth.ts`
  - Manages user authentication state
  - Persists user data and token to localStorage
  - Handles signup, login, logout actions

### API Integration
- **API Layer**: `src/lib/api.ts`
  - Handles HTTP requests to backend
  - Includes error handling and type safety
  - Configurable API base URL

### Custom Hook
- **useAuth Hook**: `src/hooks/useAuth.ts`
  - Provides clean interface to auth store
  - Auto-verifies token on app load
  - Handles token validation

### Types
- **TypeScript Types**: `src/types/auth.ts`
  - Defines interfaces for User, Auth requests/responses
  - Ensures type safety across the application

## Features

### Signup Page (`/auth/signup`)
- **Form Validation**: Client-side validation matching backend requirements
  - Name: 2-50 characters, letters and spaces only
  - Email: Valid email format
  - Password: Min 8 chars, must contain uppercase, lowercase, and number
  - Confirm Password: Must match password

- **Error Handling**: 
  - Displays validation errors from backend
  - Shows network errors
  - Clears errors when user starts typing

- **Loading States**: Shows loading indicator during API calls

- **Auto-redirect**: Redirects to home page after successful signup

## Backend Integration

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/verify` - Token verification

### Request/Response Format
```typescript
// Signup Request
{
  name: string;
  email: string;
  password: string;
}

// Response
{
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  errors?: ValidationError[];
}
```

## Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL (defaults to `http://localhost:3002/api`)

## Usage

### In Components
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, signup, logout } = useAuth();
  
  // Use auth state and actions
}
```

### Direct Store Access
```typescript
import useAuthStore from '@/lib/stores/auth';

function MyComponent() {
  const { user, signup } = useAuthStore();
}
```

## Security Features
- JWT token-based authentication
- Secure password validation
- Token persistence with auto-verification
- Automatic logout on invalid tokens

## Next Steps
1. Implement login functionality
2. Add password reset feature
3. Implement Google OAuth
4. Add email verification
5. Add role-based access control 