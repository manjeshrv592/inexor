# Authentication System Documentation

This document outlines the authentication system implemented in the application, including the login flow, session management, and auto-logout functionality.

## Authentication Flow

1. **Login Page**: Users are redirected to the `/auth` page if not authenticated.
2. **Credentials Verification**: Users must provide valid credentials (username/password).
3. **OTP Verification**: After successful credentials verification, an OTP is sent to the configured email.
4. **Session Creation**: Upon successful OTP verification, a session cookie is set.
5. **Session Validation**: Each request checks for a valid session cookie.
6. **Auto-Logout**: Inactive users are automatically logged out after a configurable period.

## Environment Variables

The following environment variables are required for the authentication system to work:

### Required Variables

```env
# Enable or disable web access protection
WEB_ACCESS_ENABLED=true

# Credentials for web access
WEB_ACCESS_USERNAME=your_username
WEB_ACCESS_PASSWORD=your_hashed_password

# Secret for signing cookies
WEB_ACCESS_SECRET=your_cookie_secret

# Email configuration for OTP
EMAIL_RECEIVER=your_email@example.com
EMAIL_SERVER=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password

# Session timeout in minutes (default: 15)
NEXT_PUBLIC_SESSION_TIMEOUT=15

# Warning time before session expires in minutes (default: 0.5)
NEXT_PUBLIC_INACTIVITY_WARNING_TIME=0.5

# OTP expiry time in minutes (default: 10)
OTP_EXPIRY_MINUTES=10
```

## Auto-Logout Implementation

The auto-logout feature consists of several components:

1. **useInactivity Hook**: Tracks user activity and triggers logout after inactivity.
2. **InactivityTracker Component**: Shows a countdown warning before logging out.
3. **AuthProvider**: Manages authentication state and protects routes.

### How It Works

1. The `useInactivity` hook tracks user activity (mouse movements, clicks, keyboard input).
2. After `NEXT_PUBLIC_SESSION_TIMEOUT` minutes of inactivity, the user is logged out.
3. `NEXT_PUBLIC_INACTIVITY_WARNING_TIME` minutes before logout, a warning is shown.
4. Users can click "Stay Logged In" to reset the inactivity timer.

## Security Considerations

- Session cookies are HTTP-only and secure.
- Passwords are hashed before being stored or compared.
- OTPs have a short expiration time.
- Session timeouts help prevent unauthorized access.
- All authentication-related errors are logged on the server side.

## Testing the Authentication Flow

### Prerequisites
- Set up all required environment variables in `.env.local`
- Start the development server
- Have access to the email configured in `EMAIL_RECEIVER`

### Test Cases

#### 1. Unauthenticated Access
- [ ] Access any protected route without being logged in
  - Expected: Redirected to `/auth`
  - Expected: Cannot access protected content

#### 2. Login with Invalid Credentials
- [ ] Attempt to log in with incorrect username/password
  - Expected: Error message displayed
  - Expected: Not redirected, stay on login page

#### 3. Login with Valid Credentials
- [ ] Enter correct username/password
  - Expected: OTP request is sent to the configured email
  - Expected: Redirected to OTP verification page

#### 4. OTP Verification
- [ ] Enter an invalid OTP
  - Expected: Error message displayed
  - Expected: Stay on OTP verification page

- [ ] Enter a valid OTP
  - Expected: Session cookie is set
  - Expected: Redirected to the home page or originally requested page

#### 5. Authenticated Access
- [ ] Access protected routes after login
  - Expected: Able to view protected content
  - Expected: No redirect to login page

#### 6. Inactivity Warning
- [ ] Stay inactive for `NEXT_PUBLIC_SESSION_TIMEOUT - NEXT_PUBLIC_INACTIVITY_WARNING_TIME` minutes
  - Expected: Warning message appears with countdown
  - Expected: Countdown updates every second

#### 7. Extend Session
- [ ] Click "Stay Logged In" during the warning period
  - Expected: Warning message disappears
  - Expected: Inactivity timer resets
  - Expected: Session remains active

#### 8. Auto-Logout
- [ ] Let the session expire without interaction
  - Expected: User is automatically logged out
  - Expected: Redirected to login page
  - Expected: Session cookie is cleared

#### 9. Manual Logout
- [ ] Click the logout button (if available)
  - Expected: Session is terminated
  - Expected: Redirected to login page
  - Expected: Cannot access protected routes

### Edge Cases to Test
- [ ] Browser refresh during an active session
- [ ] Multiple login attempts with incorrect credentials
- [ ] OTP expiration
- [ ] Network disconnection during login
- [ ] Multiple browser tabs with the same session
- [ ] Session persistence after server restart

### Performance Testing
- [ ] Login with multiple concurrent users
- [ ] Test with very short session timeouts (e.g., 1 minute)
- [ ] Test with very long session timeouts (e.g., 24 hours)

## Troubleshooting

- If you're being logged out too quickly, check `NEXT_PUBLIC_SESSION_TIMEOUT`.
- If you don't receive OTP emails, verify your email configuration.
- Check the browser console and server logs for any error messages.
- Ensure all required environment variables are set in your `.env.local` file.
