# Deployment Guide

This guide covers deploying WorkerHub to various platforms with detailed instructions and best practices.

## Vercel Deployment (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and provides optimal performance.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/workerhub)

### Manual Deployment

1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Configuration

Create `vercel.json` in your project root:

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
\`\`\`

## Netlify Deployment

### Using Git Integration

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18.17.0`

### Using Netlify CLI

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=.next
\`\`\`

### Configuration

Create `netlify.toml`:

\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18.17.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

## Railway Deployment

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Create new project from GitHub

2. **Configuration**
   Railway auto-detects Next.js projects. No additional configuration needed.

3. **Environment Variables**
   Set in Railway dashboard if needed.

## DigitalOcean App Platform

### App Spec Configuration

Create `.do/app.yaml`:

\`\`\`yaml
name: workerhub
services:
- name: web
  source_dir: /
  github:
    repo: your-username/workerhub
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
\`\`\`

## AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your repository

2. **Build Settings**
   \`\`\`yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   \`\`\`

## Docker Deployment

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose

\`\`\`yaml
version: '3.8'
services:
  workerhub:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
\`\`\`

### Build and Run

\`\`\`bash
# Build image
docker build -t workerhub .

# Run container
docker run -p 3000:3000 workerhub
\`\`\`

## Environment Variables

### Required Variables
Currently, no environment variables are required for basic functionality.

### Optional Variables
\`\`\`bash
# Analytics (if using Vercel Analytics)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Custom API endpoints (if using external APIs)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
\`\`\`

## Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   \`\`\`bash
   npm install --save-dev @next/bundle-analyzer
   \`\`\`

   Add to `next.config.js`:
   \`\`\`javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })

   module.exports = withBundleAnalyzer({
     // your next config
   })
   \`\`\`

2. **Analyze Bundle**
   \`\`\`bash
   ANALYZE=true npm run build
   \`\`\`

### CDN Configuration

For optimal performance, configure your CDN:

\`\`\`javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn-domain.com'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : '',
}
\`\`\`

## Monitoring and Analytics

### Vercel Analytics

Add to your layout:

\`\`\`tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

### Google Analytics

\`\`\`tsx
// lib/gtag.js
export const GA_TRACKING_ID = 'GA_MEASUREMENT_ID'

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

2. **Runtime Errors**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check for missing environment variables

3. **Performance Issues**
   - Analyze bundle size
   - Check image optimization
   - Verify caching headers

### Debug Mode

Enable debug mode for detailed logs:

\`\`\`bash
DEBUG=* npm run dev
\`\`\`

## Security Considerations

### Headers Configuration

Add security headers in `next.config.js`:

\`\`\`javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
\`\`\`

### Content Security Policy

\`\`\`javascript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
`

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ]
  },
}
\`\`\`

---

For additional deployment questions or issues, please refer to the main README or create an issue in the repository.
