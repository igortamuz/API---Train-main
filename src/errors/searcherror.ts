import { ApplicationError } from "../schema";

export function searchError(): ApplicationError {
  return {
    name: 'SearchError',
    message: 'An error occurred while searching data.',
  };
}