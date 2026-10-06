# Task Management API

A RESTful Task Management API built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

The API provides secure user authentication, role-based authorization, task CRUD operations, request validation, centralized error handling, HTTP request logging, Swagger/OpenAPI documentation, automated integration testing, and cloud deployment.

## Live Deployment

### Health Check

https://task-api-production-8979.up.railway.app/health

### Swagger API Documentation

https://task-api-production-8979.up.railway.app/api-docs

The API is deployed on **Railway** and uses **MongoDB Atlas** as the production database.

## Features

- User signup, login, and logout
- JWT authentication using HTTP-only cookies
- Password hashing with bcrypt
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
- Jest integration testing
- Isolated test database using MongoDB Memory Server
- Concurrent signup race-condition testing
- Separate linting for application and test code
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
- bcrypt
- Zod
- Cookie Parser
- Morgan
- Swagger / OpenAPI
- Jest
- Supertest
- MongoDB Memory Server
- SWC
- ESLint
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

All task endpoints require authentication.

- Users can create and view tasks.
- Users can update and delete their own tasks.
- Admins can update and delete any task.
- Blocked users cannot access protected endpoints.

## API Documentation

### Local Swagger UI

http://localhost:5000/api-docs

### Production Swagger UI

https://task-api-production-8979.up.railway.app/api-docs

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

tests/
├── setup.ts
├── auth.test.ts
└── task.test.ts

.env.example
eslint.config.mjs
jest.config.cjs
tsconfig.json
```

## Environment Variables

An `.env.example` file is included in the project to show the environment variables required to run the API.

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-api
JWT_SECRET=replace_with_a_secure_random_secret
```

For local development, create a `.env` file in the project root using `.env.example` as a template:

```bash
cp .env.example .env
```

Then replace the example values with your own configuration.

- `NODE_ENV` — Application environment, such as `development` or `production`.
- `PORT` — Port used by the Express server.
- `MONGODB_URI` — MongoDB connection string.
- `JWT_SECRET` — Secret key used to sign and verify JWT access tokens.

> **Security:** Never commit your real `.env` file, MongoDB credentials, or JWT secret to the repository. The `.env.example` file contains placeholder values only.

## Installation

Install the project dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The API runs locally at:

http://localhost:5000

## Testing

The project includes integration tests for the authentication and task APIs using **Jest**, **Supertest**, and **MongoDB Memory Server**.

Tests run against an isolated temporary MongoDB instance and do not use the production MongoDB Atlas database.

Run all tests:

```bash
npm test
```

The test suite currently contains **22 integration tests** across two test suites:

- Authentication API tests
- Task API tests

### Authentication Tests

The authentication test suite covers:

- Successful user signup
- Invalid email validation
- Weak password validation
- Duplicate email handling
- Concurrent signup requests using the same email
- Successful login
- Incorrect password handling
- Nonexistent user handling
- Invalid login request validation
- Logout

The concurrent signup test verifies that simultaneous signup requests using the same email result in only one account being created while the remaining requests return `409 Conflict` instead of server errors.

### Task Tests

The task test suite covers:

- Unauthenticated request rejection
- Task creation
- Task validation
- Fetching all tasks
- Fetching a task by ID
- Invalid task ID handling
- Missing task handling
- Updating a task by its author
- Empty update validation
- Preventing another user from updating a task
- Deleting a task by its author
- Preventing another user from deleting a task

## Code Quality

Lint the application source code:

```bash
npm run lint
```

Lint the test code separately:

```bash
npm run lint:test
```

Build the production TypeScript source:

```bash
npm run build
```

Run the integration test suite:

```bash
npm test
```

A successful project check should complete all of the following without errors:

```bash
npm run lint
npm run lint:test
npm run build
npm test
```

## Production

The application is deployed on **Railway** and uses **MongoDB Atlas** as the production database.

Railway builds and starts the application using the scripts defined in `package.json`:

```bash
npm run build
npm start
```

Use the production Swagger UI to explore and test the deployed API:

https://task-api-production-8979.up.railway.app/api-docs

## Node.js Version & Engine Enforcement

The project requires:

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

Expected application and client errors return appropriate HTTP status codes.

Unexpected server errors return a generic `500 Internal Server Error` response while the original error is logged internally.

Malformed JSON requests are handled by the centralized error middleware and return a `400 Bad Request` response.

## Request Logging

Morgan is used to log HTTP requests during normal application execution.

Example:

```text
POST /api/auth/login 200 24.312 ms - 128
```

Request logging is disabled during automated tests to keep the Jest output clean.

## Project Context

This project was developed as part of a software engineering internship assignment.

## License

ISC