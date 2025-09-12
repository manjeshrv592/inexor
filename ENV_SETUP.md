# Environment Variables Setup

For the inactivity timer to work correctly, you need to create a `.env.local` file in the root of your project with the following variables:

```env
# Enable or disable web access protection
NEXT_PUBLIC_WEB_ACCESS_ENABLED=true

# Web access credentials
WEB_ACCESS_USERNAME=your_username
WEB_ACCESS_PASSWORD=your_password

# Web access secret for cookie validation
NEXT_PUBLIC_WEB_ACCESS_SECRET=your_secret_key

# Email configuration for OTP
EMAIL_RECEIVER=your_email@example.com

# Session timeout in minutes
NEXT_PUBLIC_SESSION_TIMEOUT=15

# Warning time before session expires in minutes
NEXT_PUBLIC_INACTIVITY_WARNING_TIME=0.5

# Date from which OTP authentication is required (DD-MM-YYYY format)
# If current date is before this date, OTP will be bypassed after email/password verification
NEXT_PUBLIC_OTP_AUTH_FROM=01-01-2025

# Optional: Timezone for date comparison (IANA timezone string)
# Examples: 'Asia/Kolkata', 'America/New_York', 'Europe/London', 'UTC'
# If not set, uses server's local timezone
NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
```

## Steps to set up:

1. Create a new file called `.env.local` in the root of your project
2. Copy the above variables into the file
3. Save the file
4. Restart your development server for the changes to take effect

## Timezone Considerations for VPS Deployment

When deploying to a VPS, the date comparison will use the server's timezone unless you specify `NEXT_PUBLIC_TIMEZONE`. 

**Recommended approaches:**

1. **Use UTC (Recommended)**: Set `NEXT_PUBLIC_TIMEZONE=UTC` for consistent behavior regardless of server location
2. **Use specific timezone**: Set to your business timezone (e.g., `NEXT_PUBLIC_TIMEZONE=Asia/Kolkata`)
3. **Server timezone**: Leave unset to use the VPS server's local timezone

**Example scenarios:**
- VPS in US, business in India: Set `NEXT_PUBLIC_TIMEZONE=Asia/Kolkata`
- Global application: Set `NEXT_PUBLIC_TIMEZONE=UTC`
- Single region deployment: Can use server timezone or set specific timezone

## Testing the Authentication System

1. **Test OTP bypass**: Set `NEXT_PUBLIC_OTP_AUTH_FROM` to a future date and verify direct authentication
2. **Test OTP requirement**: Set `NEXT_PUBLIC_OTP_AUTH_FROM` to a past date and verify OTP flow
3. **Test timezone**: Check console logs for timezone debug information
4. **Test inactivity timer**: Wait for inactivity warning after configured timeout

If you encounter issues, check the console logs for authentication and timezone debug information.
