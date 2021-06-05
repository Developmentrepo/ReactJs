import path from "path";
import * as dotenv from "dotenv";

if (["development", "test"].includes(process.env.NODE_ENV)) {
  dotenv.config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
  })
} else {
  dotenv.config();
}

export const config = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  TIMEOUT: process.env.REACT_APP_TIMEOUT,
}
