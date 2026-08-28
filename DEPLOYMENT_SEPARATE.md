# Separate Vercel Deployment Guide (Frontend + Backend + Vercel Postgres)

## Architecture
```
Frontend (React/Vite)         Backend (Express.js)       Database
├─ vercel.com/frontend        ├─ vercel.com/api          ├─ Vercel Postgres
└─ GitHub: main/frontend      └─ GitHub: main/backend    └─ Managed PostgreSQL
```

---

## Step 1: Create Vercel Postgres Database

### 1.1 In Vercel Dashboard
1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **Storage** (left sidebar)
3. Click **Create > Postgres**
4. Select **Pro** plan (or Hobby for free tier with limitations)
5. Name it: `grademaster-db`
6. Select region closest to you
7. Click **Create**

### 1.2 Get Connection String
After creation, you'll see:
```
DATABASE_URL=postgres://default:Hx8...@ep-tiny-xyz.us-east-1.postgres.vercel.sh:5432/verceldb?sslmode=require
```
**Copy this!** You'll need it for backend.

### 1.3 Connect to Vercel Postgres
The database page shows:
- **Hostname**: `ep-tiny-xyz.us-east-1.postgres.vercel.sh`
- **Port**: `5432`
- **Database**: `verceldb`
- **Username**: `default`
- **Password**: `Hx8...` (hidden)

---

## Step 2: Deploy Backend Separately

### 2.1 Create Backend Directory Structure
Your backend needs its own `vercel.json`:

**File: `backend/vercel.json`**
```json
{
  "version": 2,
  "buildCommand": "npm install && npm run build && npx prisma generate",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "REDIS_URL": "@redis_url"
  }
}
```

### 2.2 Create New Vercel Project for Backend
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Select **GradeMasterPro** repository
3. Choose **Configure Project**
4. Set **Root Directory** to `backend`
5. Click **Deploy**

### 2.3 Add Environment Variables to Backend Project
1. In Vercel Dashboard, go to your **backend project**
2. Click **Settings > Environment Variables**
3. Add these:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Paste from Step 1.2 |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `REDIS_URL` | redis://localhost:6379 (or skip for now) |
| `NODE_ENV` | production |

4. Click **Deploy** button or push to GitHub to trigger re-deploy

### 2.4 Get Backend URL
After deploy, your backend URL will be:
```
https://YOUR-BACKEND-URL.vercel.app/api
```
**Copy this!** You'll need it for frontend.

---

## Step 3: Deploy Frontend Separately

### 3.1 Create Frontend Directory Structure
Your frontend needs its own `vercel.json`:

**File: `frontend/vercel.json`**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "https://YOUR-BACKEND-URL.vercel.app/api"
  }
}
```

### 3.2 Create New Vercel Project for Frontend
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Select **GradeMasterPro** repository
3. Choose **Configure Project**
4. Set **Root Directory** to `frontend`
5. Click **Deploy**

### 3.3 Add Environment Variables to Frontend Project
1. In Vercel Dashboard, go to your **frontend project**
2. Click **Settings > Environment Variables**
3. Add this:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | https://YOUR-BACKEND-URL.vercel.app/api |

4. Click **Re-deploy** to apply changes

### 3.4 Get Frontend URL
Your frontend will be available at:
```
https://grade-master-pro-frontend.vercel.app/
```

---

## Step 4: Initialize Database Schema

### 4.1 Run Migrations
Once backend is deployed and DATABASE_URL is set, run:

**Option A: Local Terminal (if Vercel Postgres allows)**
```bash
cd backend
npx prisma db push
```

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
vercel env pull  # Pull environment variables
npx prisma migrate deploy
```

**Option C: Add to Backend Build Script**
Edit `backend/vercel.json`:
```json
{
  "buildCommand": "npm install && npx prisma db push && npm run build"
}
```

---

## Step 5: Update CORS Settings

### In Backend (`backend/src/app.ts`)
Update CORS to allow only your frontend:
```typescript
app.use(cors({
  origin: [
    'https://grade-master-pro-frontend.vercel.app',
    'http://localhost:5173'  // Local dev
  ],
  credentials: true
}));
```

Then commit and push:
```bash
git add .
git commit -m "feat: Configure separate Vercel deployments with Postgres"
git push origin main
```

---

## Project URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://grade-master-pro-frontend.vercel.app/ |
| **Backend API** | YOUR-BACKEND-URL.vercel.app/api |
| **Database** | Vercel Postgres (managed) |
| **GitHub** | https://github.com/QaiserEjaz/GradeMasterPro |

---

## Environment Variables Summary

### Backend Project (Vercel)
```
DATABASE_URL=postgres://default:PASSWORD@host:5432/verceldb?sslmode=require
JWT_SECRET=your-random-32-char-secret
REDIS_URL=redis://localhost:6379 (optional)
NODE_ENV=production
```

### Frontend Project (Vercel)
```
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api
```

### Local Development
```bash
# backend/.env
DATABASE_URL=postgresql://localhost:5432/grade_calculator
JWT_SECRET=dev-secret

# frontend/.env
VITE_API_URL=http://localhost:3000/api
```

---

## Troubleshooting

### Database Connection Failed
- Verify `DATABASE_URL` is correct in Vercel Backend project
- Check Vercel Postgres IP allowlist (should auto-allow)
- Test connection locally first: `psql $DATABASE_URL`

### API 404 Errors
- Confirm `VITE_API_URL` in Frontend matches Backend URL
- Check Backend logs in Vercel dashboard
- Ensure API routes use `/api/` prefix

### CORS Errors
- Update `cors` configuration in `backend/src/app.ts`
- Include your frontend URL
- Commit and re-deploy backend

### Database Migration Failed
- Run `npx prisma migrate dev` locally first
- Verify DATABASE_URL is accessible
- Check Prisma migration files exist in `backend/prisma/migrations/`

---

## Local Development (Stays the Same)

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Then access: http://localhost:5173

---

## Next Steps

1. ✅ Create Vercel Postgres
2. ✅ Deploy Backend with DATABASE_URL
3. ✅ Deploy Frontend with VITE_API_URL
4. ✅ Run Prisma migrations
5. ✅ Test API connectivity
6. ✅ Custom domain (optional)
