import request from "supertest";
import { describe, expect, it } from "@jest/globals";

import app from "../src/app";
import { User } from "../src/models/user.model";

describe("Auth API", () => {
  const validUser = {
    name: "Test User",
    email: "test@example.com",
    password: "Test@1234",
  };

  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Account created successfully. Please log in.",
      );

      expect(response.body.user).toMatchObject({
        name: validUser.name,
        email: validUser.email,
      });

      expect(response.body.user.password).toBeUndefined();
    });

    it("should reject an invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send({
          ...validUser,
          email: "invalid-email",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should reject a weak password", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send({
          ...validUser,
          password: "password",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should reject a duplicate email", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send(validUser);

      const response = await request(app)
        .post("/api/auth/signup")
        .send(validUser);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already registered");
    });

    it("should handle concurrent signup requests with the same email", async () => {
      await User.init();

      const requests = Array.from({ length: 10 }, () =>
        request(app)
          .post("/api/auth/signup")
          .send(validUser),
      );

      const responses = await Promise.all(requests);

      const createdResponses = responses.filter(
        (response) => response.status === 201,
      );

      const conflictResponses = responses.filter(
        (response) => response.status === 409,
      );

      const serverErrorResponses = responses.filter(
        (response) => response.status >= 500,
      );

      expect(createdResponses).toHaveLength(1);
      expect(conflictResponses).toHaveLength(9);
      expect(serverErrorResponses).toHaveLength(0);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send(validUser);

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: validUser.email,
          password: validUser.password,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login successful");

      expect(response.body.user).toMatchObject({
        name: validUser.name,
        email: validUser.email,
      });

      expect(response.body.user.password).toBeUndefined();
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should reject an incorrect password", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send(validUser);

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: validUser.email,
          password: "Wrong@1234",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password",
      );
    });

    it("should reject a nonexistent user", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "missing@example.com",
          password: "Test@1234",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password",
      );
    });

    it("should reject an invalid login request", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "invalid-email",
          password: "",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout successfully", async () => {
      const response = await request(app)
        .post("/api/auth/logout");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        success: true,
        message: "Logout successful",
      });

      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });
});