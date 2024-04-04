import { ApplicationError } from "../schema";

export function noMatchingRecords(): ApplicationError {
  return {
    name: "NoMatchingRecords",
    message: "No matching records found.",
  };
}
