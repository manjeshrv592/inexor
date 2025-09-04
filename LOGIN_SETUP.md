# Login System Setup Guide

The login system has been successfully copied from `inexor-demo` to `inexor`. Here's how to configure and use it:

## Environment Variables

Create a `.env.local` file in the `inexor` project root with the following variables:

```env
# Authentication Settings
WEB_ACCESS_ENABLED=true
WEB_ACCESS_USERNAME=admin
WEB_ACCESS_PASSWORD=your_password_here
WEB_ACCESS_SECRET=your_secret_token_here

# Your existing Sanity settings...
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token
```

## Configuration Details

- **WEB_ACCESS_ENABLED**: Set to `"true"` to enable authentication, `"false"` to disable
- **WEB_ACCESS_USERNAME**: The username for login (e.g., "admin")
- **WEB_ACCESS_PASSWORD**: The password for login
- **WEB_ACCESS_SECRET**: A secure random string used for cookie authentication

## How It Works

1. **Middleware Protection**: The `middleware.ts` file intercepts all requests
2. **Route Exclusions**: Public assets, auth routes, and Sanity Studio are excluded
3. **Cookie-based Auth**: Successful login sets an HTTP-only cookie
4. **Automatic Redirect**: Unauthenticated users are redirected to `/auth`

## Protected Routes

All routes are protected except:

- `/_next/*` (Next.js assets)
- `/favicon*` (Favicon files)
- `/auth` (Login page)
- `/api/auth` (Authentication API)
- `/studio` (Sanity Studio)
- Image files (jpg, png, svg, etc.)

## Usage

1. Set up your environment variables in `.env.local`
2. Start the development server: `npm run dev`
3. Visit any protected route - you'll be redirected to `/auth`
4. Login with your configured credentials
5. You'll be redirected back to your original destination

## Dependencies Added

The following packages were installed:

- `@hookform/resolvers` - Form validation
- `react-hook-form` - Form management
- `zod` - Schema validation
- `cookie` - Cookie serialization
- `@types/cookie` - TypeScript definitions
- `@radix-ui/react-label` - UI component

## Files Created/Modified

- `src/middleware.ts` - Authentication middleware
- `src/app/auth/page.tsx` - Login page
- `src/app/api/auth/route.ts` - Authentication API
- `src/components/auth/LoginForm.tsx` - Login form component
- `src/lib/validations/auth.ts` - Validation schema
- `src/components/ui/card.tsx` - Card UI component
- `src/components/ui/form.tsx` - Form UI components
- `src/components/ui/input.tsx` - Input UI component
- `src/components/ui/label.tsx` - Label UI component

The login system is now ready to use!
