# GradeMasterPro

GradeMasterPro is a full-stack web application that helps students calculate GPA, CGPA, and other grading metrics across multiple international grading systems while surfacing actionable insights.

> Detailed requirements, architecture, and API documentation live in docs/REQUIREMENTS.md.

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Tooling:** Docker, Axios, npm, React Router

## Core Features
- **Multi-system grade calculations** covering US, UK, EU, and additional international scales
- **Semester and cumulative tracking** with credit-weighted averages
- **Course management** for credits, categories, and repeated courses
- **Insights engine** highlighting trends and personalized recommendations
- **Responsive UI** built with reusable React components styled via Tailwind CSS

## Project Structure
\\\	ext
GradeMasterPro/
+-- backend/          # Express API, Prisma schema, services
+-- frontend/         # React client application
+-- docs/             # Requirements and reference documentation
+-- docker-compose.yml
+-- README.md
\\\

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL instance (local or managed)

### Installation
\\\ash
# clone the repository
git clone <repo-url>
cd GradeMasterPro
## Product Preview
GradeMaster Pro is a full-stack academic planning platform for calculating GPA and CGPA, comparing international grading systems, tracking progress, and turning academic data into clear next steps.

**[Open the live website](https://grade-master-pro-frontend.vercel.app/)**

![GradeMaster Pro live preview](https://img.shields.io/badge/Live%20Preview-Open%20website-0f766e?style=for-the-badge&logo=vercel&logoColor=white)

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

### Running Locally
\\\ash

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

Refer to \docs/REQUIREMENTS.md\ for the full configuration matrix.

GradeMaster Pro is deployed as two Vercel projects:

| Service | Vercel project root | URL |
| --- | --- | --- |
| Frontend | `frontend` | [grade-master-pro-frontend.vercel.app](https://grade-master-pro-frontend.vercel.app/) |
| Backend API | `backend` | Set after backend deployment |

See [QUICK_START.md](QUICK_START.md) for the short deployment path and [DEPLOYMENT_SEPARATE.md](DEPLOYMENT_SEPARATE.md) for database, environment variable, and troubleshooting details.

Before the first production deployment, initialize the Prisma schema with `npx prisma db push` against the production `DATABASE_URL`.



```powershell
cd frontend
npm run build

cd ../backend
npx prisma generate
npm run build
```

### Backend (\ackend/package.json\)

- [Quick deployment guide](QUICK_START.md)
- [Separate frontend and backend deployment guide](DEPLOYMENT_SEPARATE.md)
- [Deployment notes](DEPLOYMENT.md)
- [Project documentation](docs/README.md)

- \
pm run dev\ � run the API with hot reload
- \
pm run build\ � compile TypeScript to JavaScript

- \
pm start\ � launch the compiled server

## Testing
Add or update tests under \rontend/src/__tests__/\ and \ackend/src/__tests__/\, then execute:
\\\ash
cd frontend && npm test
cd backend && npm test
\\\

## Deployment

### ?? Cloud Deployment (Recommended)
See [QUICK_START.md](QUICK_START.md) for a **15-minute guide** to deploy on Vercel with managed Postgres.

**Detailed Instructions:** See [DEPLOYMENT_SEPARATE.md](DEPLOYMENT_SEPARATE.md) for comprehensive instructions on separate frontend/backend deployments with Vercel Postgres, including:
- Creating Vercel Postgres database
- Setting up both frontend and backend as separate Vercel projects
- Configuring environment variables
- Database schema initialization
- CORS configuration
- Troubleshooting guide

### ?? Local / Docker
Use \docker-compose.yml\ for local orchestration via \docker-compose up --build\.

This starts:
- PostgreSQL 15 (port 5432)
- Redis 7 (port 6379)
- Express backend (port 3000)
- Nginx frontend (port 5173)

All data persists between restarts via Docker volumes.

### Alternative Hosting
- Deploy the backend to any Node-compatible environment (AWS ECS, Render, Heroku, Fly.io, etc.).
- Serve the frontend via a static host (Vercel, Netlify, S3 + CloudFront, Firebase Hosting).
- Integrate CI/CD (GitHub Actions or similar) to automate build, test, and deployment steps.

## Contributing
1. Create a feature branch from \main\: \git checkout -b feature/my-update\
2. Commit and push your changes
3. Open a Pull Request with a clear description and testing notes

## License
This project is currently proprietary. Contact the maintainers for licensing or usage inquiries.
