import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_MODULE,
  port: process.env.PORT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_reset_secret: process.env.JWT_RESET_SECRET,

  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_reset_expires_in: process.env.JWT_RESET_EXPIRES_IN,

  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  salt_round: process.env.BCRIPT_SALT_ROUND,
  email_secret: process.env.MAIL_SECRET,
  sender_email: process.env.EMAIL,
  cloudinary_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.API_KEY,
  cloudinary_secret: process.env.API_SECRET,
};
