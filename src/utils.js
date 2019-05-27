import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const generateToken = userid => jwt.sign({ userid }, process.env.TOKEN_SECRET);
