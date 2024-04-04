import { dataStorage } from "../../src/db/db";

export const clearDb = () => {
  dataStorage.length = 0;
};
