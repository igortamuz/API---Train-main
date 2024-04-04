import { ApplicationError } from "../schema";

export function missingCSVData(): ApplicationError {
  return {
    name: "MissingCSVData",
    message: "CSV data is missing.",
  };
}
