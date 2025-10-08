# Sanity Webhook Setup for Auto-Rebuild

This guide explains how to set up Sanity webhooks to automatically rebuild your static site when content changes.

## 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Webhook Security
REVALIDATE_SECRET=your-super-secret-webhook-key-here
```

## 2. Sanity Studio Webhook Configuration

1. Go to your Sanity Studio dashboard: https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **Webhooks**
4. Click **Create webhook**

### Webhook Settings:

- **Name**: `Auto Rebuild Production Site`
- **URL**: `https://your-domain.com/api/revalidate?secret=your-super-secret-webhook-key-here`
- **Trigger on**: `Create`, `Update`, `Delete`
- **Filter**: Leave empty (to trigger on all document types)
- **HTTP method**: `POST`
- **API version**: `2023-05-03` (or latest)
- **Include drafts**: `No`

### Headers (Optional):
```
Content-Type: application/json
```

## 3. VPS Deployment Script

Create this script on your VPS to handle rebuilds:

```bash
#!/bin/bash
# rebuild-site.sh

echo "🚀 Starting site rebuild..."

# Navigate to your project directory
cd /path/to/your/inexor-project

# Pull latest changes (if using Git)
git pull origin main

# Install dependencies (if needed)
npm ci

# Build the static site
npm run build

# Restart your server (adjust based on your setup)
pm2 restart inexor-app

echo "✅ Site rebuild completed!"
```

## 4. Alternative: GitHub Actions Auto-Deploy

If you're using GitHub, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  repository_dispatch:
    types: [sanity-webhook]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build static site
        run: npm run build
        
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /path/to/your/project
            git pull origin main
            npm ci
            npm run build
            pm2 restart inexor-app
```

## 5. Testing the Webhook

1. Make a change in Sanity Studio
2. Publish the change
3. Check your server logs to see if the webhook was received
4. Verify the site rebuilds automatically

## 6. Webhook Payload Example

When Sanity sends a webhook, it includes this data:

```json
{
  "_type": "blogPost",
  "_id": "abc123",
  "_rev": "def456",
  "slug": {
    "current": "my-blog-post"
  }
}
```

The revalidation API uses `_type` to determine which pages to regenerate.

## 7. Monitoring

- Check webhook delivery status in Sanity Studio
- Monitor your server logs for rebuild activity
- Set up alerts for failed rebuilds

## 8. Security Notes

- Keep your `REVALIDATE_SECRET` secure
- Use HTTPS for webhook URLs
- Consider IP whitelisting for Sanity's webhook IPs
- Monitor webhook logs for suspicious activity
