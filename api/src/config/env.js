import { config } from "dotenv";

config();

export const { NODE_ENV, PORT, DB_URI, JWT_SECRET_KEY } = process.env;
