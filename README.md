# Primetrade

Full-stack REST API with Authentication, Role-Based Access Control, and Task Management built with React and Node.js.

## Tech Stack

- **Frontend:** React.js with React Router
- **Backend:** Node.js & Express.js
- **Database:** MongoDB with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt password hashing, input validation & sanitization

## Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Password Hashing with bcrypt
- ✅ Role-Based Access Control (User vs Admin)
- ✅ Task CRUD Operations (Create, Read, Update, Delete)
- ✅ Protected Routes (Frontend & Backend)
- ✅ API Versioning (v1)
- ✅ Input Validation & Sanitization
- ✅ Error Handling with proper HTTP status codes
- ✅ Postman API Documentation

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

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/profile` | Get user profile | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create new task | Yes |
| GET | `/tasks` | Get user's tasks | Yes |
| GET | `/tasks/:id` | Get task by ID | Yes |
| PUT | `/tasks/:id` | Update task | Yes |
| DELETE | `/tasks/:id` | Delete task | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | Yes (Admin) |
| GET | `/tasks/admin/all` | Get all tasks | Yes (Admin) |

### Query Parameters (Tasks)

- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `sortBy`: Sort field (title, status, priority, dueDate, createdAt)
- `order`: Sort order (asc, desc)

### Postman Collection

Import the Postman collection from `backend/postman/Primetrade_API.postman_collection.json`

## Database Schema

### User Model
```prisma
model User {
  id        String   @id
  username  String   
  email     String   @unique
  password  String   // Hashed with bcrypt
  role      String   @default("user") // "user" or "admin"
  createdAt DateTime
  updatedAt DateTime
  tasks     Task[]
}
```

### Task Model
```prisma
model Task {
  id          String    @id
  title       String
  description String?
  status      String    @default("pending")
  priority    String    @default("medium")
  dueDate     DateTime?
  userId      String
  user        User      @relation
  createdAt   DateTime
  updatedAt   DateTime
}
```

## Security Features

- **Password Hashing:** All passwords are hashed using bcrypt before storage
- **JWT Authentication:** Secure token-based authentication with 7-day expiry
- **Role-Based Access:** Admin-only routes protected by middleware
- **Input Validation:** Server-side validation for all inputs
- **Input Sanitization:** XSS prevention through input sanitization

## Scalability Notes

This application is designed with scalability in mind:

### Current Architecture
- **Modular Structure:** Controllers, routes, and middleware are separated for easy maintenance
- **Database:** MongoDB provides horizontal scaling capabilities
- **Stateless Authentication:** JWT tokens enable easy horizontal scaling

### Future Scaling Strategies

1. **Microservices Architecture**
   - Auth Service: Handle authentication and user management
   - Task Service: Handle task CRUD operations
   - API Gateway: Route requests to appropriate services

2. **Caching Layer (Redis)**
   - Cache frequently accessed data (user profiles, task lists)
   - Session storage for improved performance
   - Rate limiting to prevent abuse

3. **Load Balancing**
   - Use Nginx or AWS ALB to distribute traffic
   - Enable multiple Node.js instances with PM2 cluster mode

4. **Database Optimization**
   - Add database indexes for frequently queried fields
   - Implement database replication for read scaling
   - Consider sharding for large datasets

5. **Containerization (Docker)**
   - Containerize services for consistent deployments
   - Use Docker Compose for local development
   - Deploy to Kubernetes for production orchestration

6. **Monitoring & Logging**
   - Implement centralized logging (ELK Stack or CloudWatch)
   - Add application performance monitoring (APM)
   - Set up health checks and alerting

## Usage

### Register New User
1. Open http://localhost:3000
2. Fill in username, email, and password
3. Click "Register"

### Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to your profile

### Manage Tasks
1. After login, click "My Tasks" on your profile
2. Create, edit, and delete tasks
3. Filter by status or priority

### Admin Access
To make a user an admin, update their role in the database:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

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

## Project Structure

```
├── backend/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & role middleware
│   ├── routes/          # API routes
│   ├── prisma/          # Database schema & client
│   ├── postman/         # API documentation
│   └── server.js        # Express app entry
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   └── App.js       # Main app component
│   └── public/
└── README.md
```

## License

MIT
