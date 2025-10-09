# GradeMasterPro

GradeMasterPro is a full-stack web application that helps students calculate GPA, CGPA, and other grading metrics across multiple international grading systems while surfacing actionable insights.

> Detailed requirements, architecture, and API documentation live in `docs/REQUIREMENTS.md`.

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
```text
GradeMasterPro/
├── backend/          # Express API, Prisma schema, services
├── frontend/         # React client application
├── docs/             # Requirements and reference documentation
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL instance (local or managed)

### Installation
```bash
# clone the repository
git clone <repo-url>
cd GradeMasterPro

# install frontend dependencies
cd frontend
npm install

# install backend dependencies
cd ../backend
npm install
```

### Running Locally
```bash
# start the frontend (http://localhost:5173)
cd frontend
npm run dev

# start the backend API (http://localhost:3000)
cd ../backend
npm run dev
```

> **Tip:** For a containerized workflow run `docker-compose up --build` from the project root.

## Environment Setup
Create `.env` files in both `frontend/` and `backend/` directories.

Minimum variables:
- `backend/.env`: `DATABASE_URL`, `JWT_SECRET`, `PORT`, plus any third-party keys (e.g., `OPENAI_API_KEY`).
- `frontend/.env`: `VITE_API_URL` and optional UI configuration flags.

Refer to `docs/REQUIREMENTS.md` for the full configuration matrix.

## npm Scripts

### Frontend (`frontend/package.json`)
- `npm run dev` – start the Vite dev server
- `npm run build` – compile production assets
- `npm run preview` – preview the production build

### Backend (`backend/package.json`)
- `npm run dev` – run the API with hot reload
- `npm run build` – compile TypeScript to JavaScript
- `npm start` – launch the compiled server

## Testing
Add or update tests under `frontend/src/__tests__/` and `backend/src/__tests__/`, then execute:
```bash
cd frontend && npm test
cd backend && npm test
```

## Deployment
- Use `docker-compose.yml` for local orchestration or as a baseline for production infrastructure.
- Deploy the backend to any Node-compatible environment (AWS ECS, Render, Heroku, etc.).
- Serve the frontend via a static host (Vercel, Netlify, S3 + CloudFront).
- Integrate CI/CD (GitHub Actions or similar) to automate build, test, and deployment steps.

## Contributing
1. Create a feature branch from `main`: `git checkout -b feature/my-update`
2. Commit and push your changes
3. Open a Pull Request with a clear description and testing notes

## License
This project is currently proprietary. Contact the maintainers for licensing or usage inquiries.



