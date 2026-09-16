import { config } from "dotenv"

config();

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const API_PREFIX = process.env.API_PREFIX;

export const CORS = process.env.CORS;
export const SMTP_EMAIL = process.env.SMTP_EMAIL;
export const SMTP_PASS = process.env.SMTP_PASS;

