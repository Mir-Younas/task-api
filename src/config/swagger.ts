import swaggerJsdoc from "swagger-jsdoc";

import { ACCESS_TOKEN_COOKIE_NAME } from "../constants/auth.constants";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Management API",
      version: "1.0.0",
      description:
        "RESTful API for user authentication, task management, role-based authorization, and account status control.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local API Server",
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: ACCESS_TOKEN_COOKIE_NAME,
        },
      },
    },
  },

  apis: ["./src/docs/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
