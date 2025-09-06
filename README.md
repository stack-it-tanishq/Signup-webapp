# Signup Web Application

A modern full-stack web application for managing email subscriptions with email verification.

## Features

- User registration with email verification
- Secure token-based verification flow
- In-memory data storage (no database required)
- TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd Signup-webapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following content:

```env
# Environment
NODE_ENV=development
```

## Running the Application

### Development Mode

To start both the backend and frontend in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Testing

To run the database operations test:

```bash
npx tsx scripts/test-db.ts
```

## API Endpoints

- `POST /api/subscribe` - Subscribe with email
  - Body: `{ "email": "user@example.com", "name": "User Name" }`
  - Returns: Subscription details with verification token

- `GET /api/verify?token=<verification_token>` - Verify email
  - Verifies the user's email using the token

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared TypeScript types and schemas
- `/migrations` - Database migration files
- `/scripts` - Utility scripts

## License

MIT
