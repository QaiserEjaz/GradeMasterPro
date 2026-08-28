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

# install frontend dependencies
cd frontend
npm install

# install backend dependencies
cd ../backend
npm install
\\\

### Running Locally
\\\ash
# start the frontend (http://localhost:5173)
cd frontend
npm run dev

# start the backend API (http://localhost:3000)
cd ../backend
npm run dev
\\\

> **Tip:** For a containerized workflow run \docker-compose up --build\ from the project root.

## Environment Setup
Create \.env\ files in both \rontend/\ and \ackend/\ directories.

Minimum variables:
- \ackend/.env\: \DATABASE_URL\, \JWT_SECRET\, \PORT\, plus any third-party keys (e.g., \OPENAI_API_KEY\).
- \rontend/.env\: \VITE_API_URL\ and optional UI configuration flags.

Refer to \docs/REQUIREMENTS.md\ for the full configuration matrix.

## npm Scripts

### Frontend (\rontend/package.json\)
- \
pm run dev\ – start the Vite dev server
- \
pm run build\ – compile production assets
- \
pm run preview\ – preview the production build

### Backend (\ackend/package.json\)
- \
pm run dev\ – run the API with hot reload
- \
pm run build\ – compile TypeScript to JavaScript
- \
pm start\ – launch the compiled server

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
