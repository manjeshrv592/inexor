# Authentication Setup Guide

This guide will help you set up the authentication system for the application.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Enable or disable web access protection
WEB_ACCESS_ENABLED=true

# Credentials for web access
WEB_ACCESS_USERNAME=your_username
WEB_ACCESS_PASSWORD=your_hashed_password

# Secret for signing cookies
WEB_ACCESS_SECRET=your_secure_secret_key_here

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

### Password Hashing

Before setting the `WEB_ACCESS_PASSWORD`, you need to hash your password. You can use the following Node.js script to generate a hashed password:

```javascript
import { hash } from 'bcryptjs';

async function generateHash(password) {
  const hashed = await hash(password, 12);
  console.log('Hashed password:', hashed);
  return hashed;
}

generateHash('your_plain_text_password');
```

## Email Configuration

For local development, you can use services like:
- [Mailtrap](https://mailtrap.io/) for testing
- [Ethereal Email](https://ethereal.email/) for a fake SMTP server

## Development Tips

1. Set `WEB_ACCESS_ENABLED=false` to disable authentication during development
2. Use `NEXT_PUBLIC_SESSION_TIMEOUT=0.1` for faster testing of session timeouts
3. Check the browser's developer console and server logs for debugging information

## Testing

Refer to the [AUTHENTICATION.md](./AUTHENTICATION.md) file for detailed testing instructions.
