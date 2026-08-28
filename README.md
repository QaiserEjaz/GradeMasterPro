# GradeMaster Pro

> Academic intelligence for every learner.

GradeMaster Pro is a full-stack academic planning platform for calculating GPA and CGPA, comparing international grading systems, tracking progress, and turning academic data into clear next steps.

**Live app:** https://grade-master-pro-frontend.vercel.app/

## What Users Can Achieve

A student can use GradeMaster Pro to:

- Select the grading system that matches their institution or target country
- Add semesters, courses, credits, grades, and course categories
- Calculate semester GPA, cumulative GPA, quality points, and percentage values
- Review results in a clear summary and identify academic trends
- Save calculations and return to them from the dashboard after signing in
- Plan future semesters and compare possible academic outcomes
- Use the resource, support, profile, and settings areas as needed

## Complete User Flow

1. **Open the app**
   Visit the [live GradeMaster Pro application](https://grade-master-pro-frontend.vercel.app/).

2. **Start with the calculator**
   Choose the grading system used by the institution or the scale you want to convert to.

3. **Build the academic record**
   Add each semester, then enter every course name, credit value, grade, and category. Add additional semesters when a cumulative result is required.

4. **Review the calculation**
   Check the GPA, CGPA, percentage, total credits, quality points, and grading-system details shown in the results area.

5. **Use the result to make a decision**
   Identify whether the current result meets a target, then adjust future courses, credits, or grades in the planner to test another scenario.

6. **Save and track progress**
   Sign in to keep calculation history, monitor progress from the dashboard, and return to previous academic plans.

7. **Get help when needed**
   Use the resources, support, profile, and settings pages to manage the rest of the academic workflow.

## Current Features

- International grading-system support, including US, UK, and EU scales
- Semester and cumulative GPA tracking
- Credit-weighted course calculations
- Course categories and repeated-course support
- Calculation history for registered users
- Academic insights and progress dashboards
- Planner and advising workflows
- Responsive interface for desktop and mobile screens

## Project Flow

```text
User
  |
  v
React frontend (Vite)
  |
  |-- Calculator and planner state
  |-- Authentication and dashboard views
  |-- API requests through Axios
  v
Express backend (Vercel serverless handler or Node server)
  |
  |-- Authentication and authorization
  |-- Grading and calculation services
  |-- Insights and grading-system routes
  v
Prisma ORM
  |
  v
PostgreSQL database
```

## Repository Structure

```text
GradeMasterPro/
├── api/                 # Root serverless entrypoint
├── backend/             # Express API, Prisma schema, services, and handler
├── frontend/            # React/Vite application
├── docs/                # Reserved for future documentation
├── docker-compose.yml   # Local PostgreSQL, Redis, API, and frontend services
└── README.md            # Authoritative project guide
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Router
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Tooling:** Docker, Axios, npm, Vercel

## Run Locally

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- PostgreSQL instance for the backend

### Install dependencies

```powershell
git clone https://github.com/QaiserEjaz/GradeMasterPro.git
cd GradeMasterPro

cd frontend
npm install

cd ../backend
npm install
```

### Configure environment variables

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/grade_calculator
JWT_SECRET=replace-with-a-long-random-secret
PORT=3000
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### Start the applications

Use two terminals:

```powershell
# Terminal 1
cd backend
npm run dev
```

```powershell
# Terminal 2
cd frontend
npm run dev
```

Open http://localhost:5173.

For the containerized workflow, run this from the project root:

```powershell
docker-compose up --build
```

## Production Deployment

The live frontend is deployed as a Vercel project rooted at `frontend`:

- **Frontend URL:** https://grade-master-pro-frontend.vercel.app/
- **Frontend build command:** `npm run build`
- **Frontend output directory:** `dist`
- **Frontend variable:** `VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api`

Deploy the backend as a separate Vercel project rooted at `backend`:

- **Build command:** `npx prisma generate && npm run build`
- **Required variables:** `DATABASE_URL`, `JWT_SECRET`, and `NODE_ENV=production`
- **API health check:** `https://YOUR-BACKEND-URL.vercel.app/api/health`

After the backend is deployed:

1. Set the frontend `VITE_API_URL` to the backend URL followed by `/api`.
2. Redeploy the frontend so Vite embeds the new API URL.
3. Initialize the database schema with `npx prisma db push` against the production database.
4. Open the frontend and test registration, login, calculation, dashboard, and API health.

## Validation

```powershell
cd frontend
npm run build

cd ../backend
npx prisma generate
npx prisma validate
npm run build
```

## Future Improvements

Planned improvements are intentionally separated from the current feature set:

- Add automated frontend and backend tests with CI checks
- Add a real migration history for controlled production schema changes
- Add exportable PDF and CSV academic reports
- Add configurable grading systems and institution-specific rules
- Improve accessibility with full keyboard navigation and screen-reader audits
- Add richer trend charts and target-GPA forecasting
- Add secure, configurable production CORS origins
- Add rate-limit and structured logging dashboards
- Add optional integrations for notifications and academic calendar planning
- Add custom domains and a documented release process

## Security Notes

- Never commit `.env` files, database URLs, or JWT secrets.
- Use a different strong `JWT_SECRET` for production.
- Keep production credentials in Vercel environment variables or the operating system secret store.
- Restrict database access and rotate credentials if they are exposed.

## Contributing

1. Create a feature branch from `main`.
2. Make focused changes and run the validation commands.
3. Open a pull request with a clear description and testing notes.

## License

This project is currently proprietary. Contact the maintainers for licensing or usage inquiries.
