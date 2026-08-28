# GradeMaster Pro

> Academic intelligence for every learner.

GradeMaster Pro is a full-stack academic planning platform for calculating GPA and CGPA, comparing international grading systems, tracking progress, and turning academic data into clear next steps.

**[Open the live website](https://grade-master-pro-frontend.vercel.app/)**

![GradeMaster Pro live preview](https://img.shields.io/badge/Live%20Preview-Open%20website-0f766e?style=for-the-badge&logo=vercel&logoColor=white)

## Product Preview

Visit the [live GradeMaster Pro preview](https://grade-master-pro-frontend.vercel.app/) to explore the current experience.

The product includes:

- Universal grade calculations across US, UK, EU, and additional grading scales
- Semester, course, credit, GPA, and cumulative progress tracking
- Dashboards for academic trends and milestone health
- Planning and advising workflows for students and institutions
- Resource, support, profile, and settings areas
- Responsive React interface for desktop and mobile screens

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Router
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Tooling:** Docker, Axios, npm, Vercel

## Repository Structure

```text
GradeMasterPro/
├── backend/          # Express API, Prisma schema, services, and Vercel handler
├── frontend/         # React/Vite application
├── docs/             # Requirements and reference documentation
├── docker-compose.yml
└── README.md
```

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

Create `backend/.env` with at least:

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

```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

For a containerized setup, run `docker-compose up --build` from the project root.

## Deployment

GradeMaster Pro is deployed as two Vercel projects:

| Service | Vercel project root | URL |
| --- | --- | --- |
| Frontend | `frontend` | [grade-master-pro-frontend.vercel.app](https://grade-master-pro-frontend.vercel.app/) |
| Backend API | `backend` | Set after backend deployment |

See [QUICK_START.md](QUICK_START.md) for the short deployment path and [DEPLOYMENT_SEPARATE.md](DEPLOYMENT_SEPARATE.md) for database, environment variable, and troubleshooting details.

Before the first production deployment, initialize the Prisma schema with `npx prisma db push` against the production `DATABASE_URL`.

## Validation

```powershell
cd frontend
npm run build

cd ../backend
npx prisma generate
npm run build
```

## Documentation

- [Quick deployment guide](QUICK_START.md)
- [Separate frontend and backend deployment guide](DEPLOYMENT_SEPARATE.md)
- [Deployment notes](DEPLOYMENT.md)
- [Project documentation](docs/README.md)

## Contributing

1. Create a feature branch from `main`.
2. Make focused changes and run the relevant build checks.
3. Open a pull request with testing notes.

## License

This project is currently proprietary. Contact the maintainers for licensing or usage inquiries.
