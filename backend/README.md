# Backend

Node.js/Express backend with MongoDB and Prisma ORM.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and add your MongoDB credentials.

```bash
npm run prisma:generate
npm run prisma:push
npm run dev
```

Backend runs on http://localhost:5000
