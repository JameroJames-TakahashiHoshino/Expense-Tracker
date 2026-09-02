# Expense Tracker

A full-stack personal expense tracker for managing income, allowances, and expenses. Users can create an account, log in, add and delete financial records, view dashboard summaries and charts, upload a profile image, download Excel reports, and switch between light and dark themes.

## Technology

- Frontend: React 19, Vite, React Router, Tailwind CSS, Recharts, Axios
- Backend: Node.js, Express 5, MongoDB, Mongoose, JWT authentication
- File uploads: Multer
- Reports: XLSX

## Project Structure

```text
backend/
  server.js              Express API entry point
  config/                MongoDB connection
  controllers/           Request and business logic
  middleware/            JWT auth and image upload middleware
  models/                MongoDB schemas
  routes/                API routes
  uploads/               Local uploaded images

frontend/expense-tracker/
  src/
    components/          Reusable UI, charts and layouts
    context/              User authentication state
    pages/                Login, signup and dashboard pages
    utils/                API paths, Axios and helper functions
```

## Requirements

- Node.js 20 or newer
- MongoDB local installation or a MongoDB Atlas database
- npm

## Environment Setup

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
PORT=8000
```

For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string. Keep `.env` private and never commit it.

## Install Dependencies

From the repository root, run:

```powershell
cd backend
npm install

cd ../frontend/expense-tracker
npm install
```

## Run Locally

Open two terminals.

### Terminal 1: Backend

```powershell
cd "path\to\Expense Tracker\backend"
npm run dev
```

The API runs at `http://localhost:8000`.

### Terminal 2: Frontend

```powershell
cd "path\to\Expense Tracker\frontend\expense-tracker"
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

The backend must be running for login, registration, dashboard data, uploads, and financial records to work.

## How It Works

1. A user registers or signs in through the React frontend.
2. The Express API validates the request and checks MongoDB.
3. The backend returns a JWT token and user data.
4. The frontend stores the token in local storage and sends it as a Bearer token on protected requests.
5. Protected routes use the JWT to identify the current user.
6. Income and expense records are stored in MongoDB and displayed in dashboard charts and transaction lists.
7. Excel download endpoints generate reports for the current user's records.

## API Areas

All API routes use the `/api/v1` prefix.

- Authentication: `/auth/register`, `/auth/login`, `/auth/getUser`, `/auth/upload-image`
- Dashboard: `/dashboard`
- Income: `/income/add`, `/income/get`, `/income/:id`, `/income/downloadexcel`
- Expenses: `/expense/add`, `/expense/get`, `/expense/:id`, `/expense/downloadexcel`

Income, expense and dashboard routes require a valid JWT Bearer token.

## Frontend Commands

Run these inside `frontend/expense-tracker`:

```powershell
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Deployment Notes

A practical deployment setup is:

- GitHub for source control
- Vercel for the frontend
- Render for the backend
- MongoDB Atlas for the database

Vercel settings:

```text
Root Directory: frontend/expense-tracker
Build Command: npm run build
Output Directory: dist
```

Set this Vercel environment variable:

```env
VITE_API_URL=https://your-backend.onrender.com
```

Render settings:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` as environment variables in Render. Set `CLIENT_URL` to the final Vercel URL. The frontend keeps using `http://localhost:8000` locally when `VITE_API_URL` is not set.

Uploaded images currently use the backend's local `uploads` directory. Local disk storage is temporary on many cloud hosts, so production deployments should use persistent storage such as Cloudinary or Amazon S3.

## Security Notes

- Never commit `backend/.env`.
- Use a strong, private JWT secret.
- Rotate database credentials if they have been exposed.
- Restrict MongoDB Atlas network access where possible.
- Do not add uploaded personal images to the repository.
