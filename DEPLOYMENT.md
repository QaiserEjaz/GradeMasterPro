# Vercel Deployment Guide

## Prerequisites
- GitHub account (code is already pushed)
- Vercel account (free tier available)
- PostgreSQL database (Vercel Postgres or external)

## Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New Project**
4. Select your `GradeMasterPro` repository
5. Click **Import**

## Step 2: Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

```
DATABASE_URL = postgresql://user:password@host:port/database
JWT_SECRET = your-super-secret-jwt-key-min-32-chars
PORT = 3000
VITE_API_URL = https://your-vercel-domain.vercel.app/api
```

### Get PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
- In Vercel dashboard, go to **Storage > Create > Postgres**
- Vercel will auto-fill `DATABASE_URL`
- Copy the connection string

**Option B: External Database**
- Use [Railway](https://railway.app), [Supabase](https://supabase.com), or [Render](https://render.com)
- Get the connection string and paste in Vercel

## Step 3: Deploy

1. **First Deploy:** Vercel auto-deploys when you push to GitHub
2. **Automatic Migrations:** 
   ```bash
   # Run this locally first (when PostgreSQL is ready):
   npx prisma migrate deploy
   ```
   Or configure in Vercel as a build command.

## Step 4: Update Frontend API URL

Once Vercel creates your domain (e.g., `grademaster-pro.vercel.app`):

1. In Vercel dashboard, go to **Settings > Environment Variables**
2. Update `VITE_API_URL`:
   ```
   VITE_API_URL = https://grademaster-pro.vercel.app/api
   ```
3. Re-deploy (push a commit to trigger)

## Frontend Deployment Details

- **Build Command:** `npm run build --prefix ./frontend`
- **Output Directory:** `./frontend/dist`
- **Runtime:** Node.js 18.x

## Backend Deployment Details

- **Framework:** Express.js (Serverless Functions)
- **Runtime:** Node.js 18.x
- **API Routes:** `/api/*` → Serverless function
- **Database:** Prisma ORM (requires `DATABASE_URL`)

## Troubleshooting

**Issue: API calls fail 404**
- Check `VITE_API_URL` environment variable
- Ensure API routes use `/api/` prefix
- Check Vercel logs: **Deployments > View Logs**

**Issue: Database connection error**
- Verify `DATABASE_URL` is correct
- Check database firewall/security groups allow Vercel IPs
- For Vercel Postgres: [Check IP whitelist](https://vercel.com/docs/storage/vercel-postgres/usage#ip-allowlist)

**Issue: Prisma migrations fail**
- Run locally first: `npx prisma migrate deploy`
- Or add to Vercel build: include migration step

## Domain Setup (Optional)

1. Go to Vercel **Settings > Domains**
2. Add custom domain (e.g., `grademaster.com`)
3. Update `VITE_API_URL` if using custom domain

## Monitoring

- **Logs:** Vercel Dashboard → Deployments → Logs
- **Analytics:** Vercel Dashboard → Analytics
- **Database:** Use Prisma Studio (if available) or your DB provider's dashboard

## Local Development Still Works

```bash
# With PostgreSQL running locally:
cd backend && npm run dev
cd frontend && npm run dev
```

---

**Questions?** Check:
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
