# Application Setup Guide

This guide will walk you through setting up and running this Next.js application with Sanity CMS backend.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 20 or higher recommended)
- **npm** (comes with Node.js)
- A code editor (VS Code, WebStorm, etc.)

## Setup Instructions

### 1. Extract the Project

Extract the zipped project folder to your desired location.

### 2. Install Dependencies

Open a terminal in the project root directory and run:

```bash
npm install
```

This will install all required dependencies for both the Next.js application and Sanity CMS.

### 3. Configure Environment Variables

A `.env.local` file has been provided with this package. This file contains all the necessary environment variables for the application to function properly.

**Location:** Place the `.env.local` file in the root directory of the project (same level as `package.json`).

> [!IMPORTANT]
> The `.env.local` file contains sensitive information. Keep it secure and never commit it to version control or share it publicly.

See the [Environment Variables Reference](#environment-variables-reference) section below for detailed information about each variable.

### 4. Running the Application

#### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Build

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

#### Running Sanity Studio

To run the Sanity CMS Studio locally:

```bash
npm run sanity
```

The Sanity Studio will be available at `http://localhost:3333`

## Environment Variables Reference

Below is a comprehensive explanation of all environment variables used in this application:

### Google reCAPTCHA v3

- **`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`**  
  Public site key for Google reCAPTCHA v3 integration. Used on the client-side to render the reCAPTCHA widget on forms to prevent spam submissions.

- **`RECAPTCHA_SECRET_KEY`**  
  Secret key for Google reCAPTCHA v3. Used on the server-side to verify reCAPTCHA responses and validate that form submissions are legitimate.

### Webhook Configuration

- **`REVALIDATE_SECRET`**  
  Secret token used to secure the webhook endpoints for on-demand revalidation. When Sanity content is updated, this secret ensures only authorized requests can trigger Next.js to rebuild/revalidate pages.

### Sanity CMS Configuration

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**  
  Your Sanity project ID. This identifies your specific Sanity project and is publicly accessible.

- **`NEXT_PUBLIC_SANITY_DATASET`**  
  The Sanity dataset to use (typically `production` or `development`). Datasets allow you to separate content for different environments.

- **`NEXT_PUBLIC_SANITY_API_VERSION`**  
  The Sanity API version to use (format: `YYYY-MM-DD`). This ensures consistent API behavior as Sanity evolves.

- **`SANITY_API_TOKEN`**  
  Authentication token for Sanity API requests. Required for write operations and accessing draft content. Keep this secret and never expose it to the client.

### Email Functionality (Gmail)

- **`GMAIL_USER`**  
  The Gmail email address used to send emails from the application.

- **`GMAIL_APP_PASSWORD`**  
  Gmail app-specific password (not your regular Gmail password). Required for authentication when sending emails via Gmail SMTP. Generate this from your Google Account security settings.

- **`EMAIL_RECEIVER`**  
  The email address that will receive form submissions and notifications from the application.

- **`EMAIL_FROM`**  
  The "From" address that appears in sent emails. Usually the same as `GMAIL_USER`.

### Microsoft Office / Azure Graph API

> [!NOTE]
> These settings are required if you're using Microsoft Office integration features (e.g., sending emails through Microsoft Graph API).

- **`MS_TENANT_ID`**  
  Your Microsoft Azure Active Directory tenant ID. Identifies your organization in Azure.

- **`MS_CLIENT_ID`**  
  The Application (client) ID from your Azure AD app registration. Used to authenticate the application with Microsoft services.

- **`MS_CLIENT_SECRET`**  
  Client secret for the Azure AD application. Used along with the client ID to authenticate server-side requests.

- **`MS_SECRET_ID`**  
  The ID/name of the client secret in Azure (for reference/rotation purposes).

- **`MS_OFFICE_EMAIL`**  
  The Microsoft Office email address used for sending emails through Microsoft Graph API.

### Web Access Control

These settings control access to the website using basic authentication and OTP (One-Time Password) verification.

- **`NEXT_PUBLIC_WEB_ACCESS_ENABLED`**  
  Boolean flag (`true` or `false`) that enables/disables the web access control feature. When enabled, visitors must authenticate before accessing the site.

- **`WEB_ACCESS_USERNAME`**  
  Username for basic authentication to access the website.

- **`WEB_ACCESS_PASSWORD`**  
  Password for basic authentication to access the website.

- **`WEB_ACCESS_SECRET`**  
  Server-side secret used to sign and verify authentication tokens.

- **`NEXT_PUBLIC_WEB_ACCESS_SECRET`**  
  Public version of the web access secret (if needed for client-side operations).

- **`NEXT_PUBLIC_OTP_AUTH_FROM`**  
  The "From" email address or identifier used when sending OTP verification emails.

- **`NEXT_PUBLIC_TIMEZONE`**  
  The timezone used for the application (e.g., `America/New_York`, `Asia/Kolkata`). Affects time display and session management.

### Session Management

- **`NEXT_PUBLIC_SESSION_TIMEOUT`**  
  Session timeout duration in minutes. After this period of activity, users will be automatically logged out. Default: `15` minutes, currently set to `20`.

- **`NEXT_PUBLIC_INACTIVITY_WARNING_TIME`**  
  Time in minutes before session expiry when a warning is shown to the user. Default: `0.5` minutes (30 seconds).

### Site Configuration

- **`NEXT_PUBLIC_SITE_URL`**  
  The full URL where the application is hosted (e.g., `http://localhost:3000` for development, `https://yourdomain.com` for production). Used for generating absolute URLs and canonical links.

### OTP (One-Time Password) Settings

- **`OTP_SECRET`**  
  Secret key used to generate and verify OTPs. Should be a secure random string. Keep this confidential.

- **`OTP_EXPIRY_MINUTES`**  
  Duration in minutes after which an OTP expires. Default: `10` minutes.

- **`NEXTAUTH_URL`**  
  The canonical URL of your site. Required for NextAuth.js to function correctly. Should match your `NEXT_PUBLIC_SITE_URL`.

### Build Optimization

- **`NEXT_PHASE`**  
  Optional environment variable for build-time optimization. Set to `phase-production-build` when creating static production builds.

---

## Troubleshooting

### Common Issues

**Port Already in Use**
- If port 3000 is already in use, you can specify a different port:
  ```bash
  npm run dev -- -p 3001
  ```

**Sanity Studio Not Loading**
- Ensure your Sanity configuration is correct in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- Check that you have the correct API version set

**Email Not Sending**
- Verify your Gmail app password is correct
- Ensure "Less secure app access" is enabled or you're using app-specific passwords
- Check that the Microsoft Graph API credentials are correct if using MS Office email

**Build Errors**
- Clear the `.next` folder and node_modules, then reinstall:
  ```bash
  rm -rf .next node_modules
  npm install
  npm run build
  ```

## Additional Resources

The project includes several documentation files for specific features:

- `ENV_SETUP.md` - Additional environment setup details
- `LOGIN_SETUP.md` - Login functionality configuration
- `WEBHOOK_SETUP.md` - Webhook configuration for Sanity
- `SANITY_CMS_INTEGRATION_DOCUMENTATION.md` - Comprehensive Sanity CMS integration guide

## Support

For any issues or questions during setup, please contact the development team.

---

**Last Updated:** 21st Nov 2025
