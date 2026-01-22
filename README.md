# Sem4 Project

Full-stack authentication application with React and Node.js.

## Tech Stack

- React.js
- Node.js & Express
- MongoDB & Prisma ORM
- JWT Authentication
- bcrypt Password Hashing

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/anya-xcode/Primetrade.git
cd sem4project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and add your MongoDB credentials:

```bash
cp .env.example .env
```

Initialize database:

```bash
npm run prisma:generate
npm run prisma:push
```

Start backend:

```bash
npm run dev
```

Backend runs on http://localhost:5000

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

## Usage

### Register New User
1. Open http://localhost:3000
2. Click "Sign Up"
3. Enter username, email, and password
4. Click "Sign Up"

### Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to your profile

### View All Users (Admin)
- Visit http://localhost:3000/admin to see all registered users

## Features

- User Registration & Login
- JWT Token Authentication
- Password Hashing with bcrypt
- User Profile Page
- Admin Panel (View all users)
- Protected Routes

## API Endpoints

- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get profile (Protected)
- GET /api/admin/users - Get all users (Protected)

## Troubleshooting

**Port Already in Use**
```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

**Database Connection Error**
- Check your MongoDB credentials in `.env`
- Ensure MongoDB Atlas allows your IP address

**Prisma Issues**
```bash
npm run prisma:generate
npm run prisma:push
```
