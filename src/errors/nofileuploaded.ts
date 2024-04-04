import { ApplicationError } from "../schema";

export function noFileUploaded(): ApplicationError {
  return {
    name: "NoFileUploaded",
    message: "No file uploaded.",
  };
}
