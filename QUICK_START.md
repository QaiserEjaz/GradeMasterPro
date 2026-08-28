# 🚀 Quick Start: Separate Vercel + Postgres Deployment

## Timeline: ~15 minutes

### Phase 1: Vercel Postgres (5 min)

1. Go to **https://vercel.com/dashboard**
2. Click **Storage** → **Create** → **Postgres**
3. Name: `grademaster-db` | Select your region
4. **Copy** the `DATABASE_URL` (starts with `postgres://`)
   ```
   postgres://default:PASSWORD@host:port/verceldb?sslmode=require
   ```

✅ **Postgres Ready!**

---

### Phase 2: Deploy Backend (5 min)

1. Go to **https://vercel.com/new**
2. Import **GradeMasterPro** repo
3. **Configure Project:**
   - Root Directory: `backend`
   - Click **Deploy**

4. **After deployment**, go to **Settings > Environment Variables**
   - Add `DATABASE_URL` → Paste from Phase 1
   - Add `JWT_SECRET` → Generate:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Click **Save** → Re-deploy

5. **Copy your Backend URL** from the Vercel project dashboard.

✅ **Backend Running!**

---

### Phase 3: Deploy Frontend (5 min)

1. Go to **https://vercel.com/new**
2. Import **GradeMasterPro** repo
3. **Configure Project:**
   - Root Directory: `frontend`
   - Click **Deploy**

4. **After deployment**, go to **Settings > Environment Variables**
   - Add `VITE_API_URL` → `https://YOUR-BACKEND-URL.vercel.app/api`
   - Click **Save** → Re-deploy

5. Your live frontend is: `https://grade-master-pro-frontend.vercel.app/`

✅ **Frontend Running!**

---

### Phase 4: Initialize Database (1 min)

From your **local terminal**:
```bash
cd backend
npx prisma db push
```

✅ **All Done!**

---

## Your URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://grade-master-pro-frontend.vercel.app/ |
| **Backend API** | YOUR-BACKEND-URL.vercel.app/api |
| **Health Check** | YOUR-BACKEND-URL.vercel.app/api/health |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Frontend shows 404** | Check `VITE_API_URL` in frontend settings, re-deploy |
| **API connection fails** | Verify `DATABASE_URL` in backend settings |
| **Database error** | Set `DATABASE_URL`, then run `npx prisma db push` locally |
| **CORS error** | Update `backend/src/app.ts` with frontend URL, commit & push |

---

## Environment Variables Checklist

### Backend Project
- [ ] `DATABASE_URL` = from Vercel Postgres
- [ ] `JWT_SECRET` = random 32-char string
- [ ] Deployed and running

### Frontend Project  
- [ ] `VITE_API_URL` = Backend API URL
- [ ] Deployed and running

### Local Development (Optional)
```bash
# backend/.env
DATABASE_URL=postgresql://localhost:5432/grade_calculator
JWT_SECRET=dev-secret

# frontend/.env  
VITE_API_URL=http://localhost:3000/api
```

---

## Next: Test Your App

1. Visit **https://grade-master-pro-frontend.vercel.app/**
2. Register a new account
3. Try calculating grades

If it works → **✅ Deployment Complete!**

If not → Check logs in Vercel dashboard
