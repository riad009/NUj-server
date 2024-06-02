import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  openai_key: process.env.OPENAI_KEY,

  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  zoom_sdk_key: process.env.ZOOM_MEETING_SDK_KEY,
  zoom_sdk_secret: process.env.ZOOM_MEETING_SDK_SECRET,
  zoom_account_id: process.env.ZOOM_ACCOUNT_ID,
  zoom_client_id: process.env.ZOOM_CLIENT_ID,
  zoom_client_secret: process.env.ZOOM_CLIENT_SECRET,
};
