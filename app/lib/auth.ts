import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};