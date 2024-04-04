import { ApplicationError } from "../schema";

export function missingSearchTerm(): ApplicationError {
  return {
    name: "MissingSearchTerm",
    message: "Missing search term.",
  };
}
