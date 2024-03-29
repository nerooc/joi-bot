import dotenv from "dotenv";

dotenv.config();

const {
  CLIENT_ID,
  DISCORD_TOKEN,
  OPENAI_API_KEY,
  FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_PRIVATE_KEY,
} = process.env;

if (
  !CLIENT_ID ||
  !DISCORD_TOKEN ||
  !OPENAI_API_KEY ||
  !FIRESTORE_CLIENT_EMAIL ||
  !FIRESTORE_PRIVATE_KEY
) {
  throw new Error("Missing environment variables");
}

const config: Record<string, string> = {
  CLIENT_ID,
  DISCORD_TOKEN,
  OPENAI_API_KEY,
  FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_PRIVATE_KEY,
};

export default config;
