Full Stack Application

A full-stack web application with React frontend and Node.js/Express backend, featuring user authentication and admin dashboard.

## 🚀 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Prisma ORM
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React.js
- CSS3 with custom styling
- Axios for API calls
- Particles.js for animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd sem4project
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="mongodb://localhost:27017/sem4project"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/sem4project"

MONGODB_URI="mongodb://localhost:27017/sem4project"
JWT_SECRET="your-secret-key-change-in-production"
PORT=5000
```

#### Initialize Prisma
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

#### Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# OR Production mode
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Configure API Endpoint (if needed)
Update the API base URL in `src/services/api.js` if your backend runs on a different port.

#### Start Frontend Development Server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
sem4project/
├── backend/
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Database models
│   ├── prisma/            # Prisma configuration
│   │   ├── prisma.js
│   │   └── schema.prisma
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   └── admin.js
│   ├── server.js          # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── Auth.js
    │   │   ├── Profile.js
    │   │   ├── Admin.js
    │   │   └── ParticlesBackground.js
    │   ├── services/      # API service layer
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔑 Features

- **User Authentication**: Register and login with JWT tokens
- **Password Security**: Bcrypt hashing with salt rounds
- **Profile Management**: View and manage user profiles
- **Admin Dashboard**: Admin-only routes and features
- **Protected Routes**: Middleware-based route protection
- **MongoDB Integration**: Using Prisma ORM for database operations

## 🔐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Admin Routes
- `GET /api/admin/users` - Get all users (Admin only)
- Additional admin endpoints...

## 🧪 Testing

### Test Backend API
```bash
# Using curl
curl http://localhost:5000/

# Or visit in browser
http://localhost:5000/
```

### Test Frontend
```bash
# Run tests
cd frontend
npm test
```

## 📝 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema changes to database

### Frontend
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas connection string is correct
- Check if DATABASE_URL in `.env` is properly configured

### Prisma Errors
- Run `npm run prisma:generate` after any schema changes
- Run `npm run prisma:push` to sync with database

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 🚀 Deployment

### Backend Deployment (Example: Heroku/Railway)
1. Set environment variables on your hosting platform
2. Ensure DATABASE_URL points to production MongoDB
3. Build and deploy

### Frontend Deployment (Example: Vercel/Netlify)
1. Build the production bundle: `npm run build`
2. Deploy the `build` folder
3. Configure API endpoint to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

Your Name - [Your Email/GitHub]

## 🙏 Acknowledgments

- React documentation
- Express.js guides
- Prisma documentation
- MongoDB tutorials
