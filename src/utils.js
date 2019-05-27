import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const generateToken = userid =>
  jwt.sign({ id }, process.env.TOKEN_SECRET);
