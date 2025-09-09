# Environment Variables Setup

For the inactivity timer to work correctly, you need to create a `.env.local` file in the root of your project with the following variables:

```env
# Enable or disable web access protection
WEB_ACCESS_ENABLED=true

# Session timeout in minutes
NEXT_PUBLIC_SESSION_TIMEOUT=1

# Warning time before session expires in minutes
NEXT_PUBLIC_INACTIVITY_WARNING_TIME=0.5
```

## Steps to set up:

1. Create a new file called `.env.local` in the root of your project
2. Copy the above variables into the file
3. Save the file
4. Restart your development server for the changes to take effect

## Testing the Inactivity Timer

1. Log in to the application
2. Open the browser's developer console (F12)
3. Wait for the inactivity warning to appear (should be after 30 seconds of inactivity)
4. The countdown should start from 30 seconds
5. Click "Stay Logged In" to reset the timer
6. Let the countdown reach 0 to test the auto-logout

If you don't see the inactivity warning, check the console logs for any error messages.
