import { ApplicationError } from "../schema";

export function CSVProcessingError(): ApplicationError {
  return {
    name: "CSVProcessingError",
    message: "An error occurred while processing the CSV file.",
  };
}
