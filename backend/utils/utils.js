import { dirname } from "path";
import { fileURLToPath } from "url";
import { fetchConfirmationCode } from "./email.js";

export async function getCode() {
  console.log("Inside getCode");
  try {
    const code = await fetchConfirmationCode();
    return code;
  } catch (error) {
    console.error("Error fetching confirmation code:", error);
    return null;
  }
}

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
