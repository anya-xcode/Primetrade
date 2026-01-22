# Sem4 Project

Full-stack web application with React frontend and Node.js/Express backend.

## Tech Stack

**Backend**
- Node.js & Express.js
- MongoDB with Prisma ORM
- JWT Authentication
- bcryptjs for password hashing

**Frontend**
- React.js
- Axios for API calls
- CSS3

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## Installation & Setup

### Clone the Repository

```bash
git clone <your-repo-url>
cd sem4project
```

### Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file in backend directory:

```
DATABASE_URL=mongodb://localhost:27017/sem4project
MONGODB_URI=mongodb://localhost:27017/sem4project
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

Initialize Prisma:

```bash
npm run prisma:generate
npm run prisma:push
```

Start backend server:

```bash
npm run dev
```

Backend runs on http://localhost:5000

### Frontend Setup

Open a new terminal and navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm start
```

Frontend runs on http://localhost:3000

## Project Structure

```
sem4project/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   ├── prisma/
│   │   ├── prisma.js
│   │   └── schema.prisma
│   ├── routes/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Auth.js
    │   │   ├── Profile.js
    │   │   ├── Admin.js
    │   │   └── ParticlesBackground.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Features

- User Authentication (JWT)
- Password Hashing (bcrypt)
- Profile Management
- Admin Dashboard
- Protected Routes
- MongoDB with Prisma ORM

## API Endpoints

**Authentication**
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (Protected)

**Admin**
- GET /api/admin/users - Get all users (Admin only)

## Available Scripts

**Backend**
- npm start - Start production server
- npm run dev - Start development server
- npm run prisma:generate - Generate Prisma Client
- npm run prisma:push - Push schema to database

**Frontend**
- npm start - Start development server
- npm test - Run tests
- npm run build - Build for production

## Troubleshooting

**MongoDB Connection Issues**
- Ensure MongoDB is running locally
- Check DATABASE_URL in .env file

**Prisma Errors**
- Run npm run prisma:generate after schema changes
- Run npm run prisma:push to sync with database

**Port Already in Use**

```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```
