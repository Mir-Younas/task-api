# Task Management API

A RESTful Task Management API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

The API provides secure user authentication, role-based authorization, task CRUD operations, request validation, centralized error handling, HTTP request logging, Swagger/OpenAPI documentation, and cloud deployment.

## Live Deployment

### Health Check

```text
https://task-api-production-8979.up.railway.app/health
```

### Swagger API Documentation

```text
https://task-api-production-8979.up.railway.app/api-docs
```

The API is deployed on **Railway** and uses **MongoDB Atlas** as the production database.

## Features

- User signup, login, and logout
- JWT authentication using HTTP-only cookies
- Password hashing
- User roles: `user` and `admin`
- User status: `active` and `blocked`
- Role-based task authorization
- Complete Task CRUD operations
- Task ownership using author references
- Zod request validation
- Centralized error handling
- Custom application errors
- MongoDB integration with Mongoose
- Morgan HTTP request logging
- Swagger/OpenAPI documentation
- Node.js version enforcement with engine strict mode
- Railway deployment
- MongoDB Atlas production database

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- Zod
- Cookie Parser
- Morgan
- Swagger / OpenAPI
- Railway

## API Endpoints

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Check API status |

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | Logout the authenticated user |

### Tasks

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Fetch all tasks |
| GET | `/api/tasks/:taskId` | Fetch a task by ID |
| PATCH | `/api/tasks/:taskId` | Update a task |
| DELETE | `/api/tasks/:taskId` | Delete a task |

## Authorization

All Task endpoints require authentication.

- Users can create and view tasks.
- Users can update and delete their own tasks.
- Admins can update and delete any task.
- Blocked users cannot access protected endpoints.

## API Documentation

### Local Swagger UI

```text
http://localhost:5000/api-docs
```

### Production Swagger UI

```text
https://task-api-production-8979.up.railway.app/api-docs
```

The documentation includes authentication requirements, request schemas, validation rules, path parameters, and response status codes.

## Project Structure

```text
src/
├── config/
│   ├── db.ts
│   └── swagger.ts
├── constants/
├── controllers/
│   ├── auth.controller.ts
│   └── task.controller.ts
├── docs/
│   ├── auth.swagger.ts
│   └── task.swagger.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── models/
│   ├── user.model.ts
│   └── task.model.ts
├── routes/
│   ├── auth.routes.ts
│   └── task.routes.ts
├── services/
│   ├── auth.service.ts
│   └── task.service.ts
├── types/
├── utils/
├── validation/
│   ├── auth.schema.ts
│   └── task.schema.ts
├── app.ts
└── server.ts
```

## Environment Variables

Create a `.env` file in the project root for local development:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
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

## Production

The application is deployed on Railway and uses MongoDB Atlas in production.

Railway builds and starts the application using the scripts defined in `package.json`:

```bash
npm run build
npm start
```

Use the production Swagger UI to explore and test the deployed API:

```text
https://task-api-production-8979.up.railway.app/api-docs
```

## Code Quality

```bash
npm run lint
npm run build
```

## Node.js Version & Engine Enforcement

```text
Node.js >= 22.14.0 < 23
```

The supported Node.js version is defined in `package.json` using the `engines` field.

Engine strict mode is enabled in `.npmrc`:

```text
engine-strict=true
```

Installing dependencies with an unsupported Node.js version will fail with an `EBADENGINE` error.

## Error Handling

Application errors follow a consistent JSON response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

Unexpected server errors return a generic `500 Internal Server Error` response while the original error is logged internally.

## Request Logging

Morgan is used to log HTTP requests.

Example:

```text
POST /api/auth/login 200 24.312 ms - 128
```

## Project Context

This project was developed as part of a software engineering internship assignment.

## License

ISC
