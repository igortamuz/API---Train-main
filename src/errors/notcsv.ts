import { ApplicationError } from "../schema";

export function notCSV(): ApplicationError {
  return {
    name: "NotCSV",
    message: "Uploaded file is not a CSV.",
  };
}
