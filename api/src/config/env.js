import { config } from "dotenv";

config();

export const { NODE_ENV, PORT, DB_URI, JWT_SECRET_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
