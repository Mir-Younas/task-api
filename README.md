# Task API

A RESTful Task Management API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

The API includes authentication, request validation, centralized error handling, cookie-based JWT sessions, and structured HTTP request logging.

## Features

- User signup
- User login
- User logout
- JWT authentication with HTTP cookies
- Password hashing
- Zod request validation
- Centralized error handling
- Custom application errors
- MongoDB integration with Mongoose
- HTTP request logging with Morgan
- Node.js engine enforcement

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Zod
- Cookie Parser
- Morgan

## API Endpoints

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Check API status |

### Authentication

Base path:

```text
/api/auth
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | Logout the authenticated user |

## Project Structure

```text
src/
├── controllers/
│   └── auth.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── models/
│   └── user.model.ts
├── routes/
│   └── auth.routes.ts
├── utils/
│   └── app-error.ts
├── validation/
│   └── auth.schema.ts
├── app.ts
└── server.ts
```

## Environment Variables

Create a `.env` file in the project root with the required environment variables:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The API runs locally at:

```text
http://localhost:5000
```

## Node.js Version

```text
Node.js >= 22.14.0 < 23
```

The required Node.js version is enforced through the `engines` field in `package.json` and `engine-strict=true` in `.npmrc`.

## Error Response

Application errors follow a consistent JSON format:

```json
{
  "success": false,
  "message": "Error message"
}
```

Unexpected server errors return:

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Request Logging

Morgan is used to log HTTP requests during development.

Example:

```text
POST /api/auth/login 200 24.312 ms - 128
```

## License

This project is developed as part of a software engineering internship assignment.
