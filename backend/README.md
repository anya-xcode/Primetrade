# Backend - Node.js & MongoDB

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Update `.env` file with your MongoDB connection string
   - Default: `mongodb://localhost:27017/sem4project`

3. **Start the Server**
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## Project Structure

```
backend/
├── controllers/    # Route controllers
├── models/        # MongoDB models
├── routes/        # API routes
├── server.js      # Main application file
├── .env          # Environment variables
└── package.json  # Dependencies
```

## API Endpoints

- `GET /` - Welcome message

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Enable CORS
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload
