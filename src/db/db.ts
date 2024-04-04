import { CSVRow } from "../schema/api.schema";

export const dataStorage: CSVRow[] = [];
console.log("Data structure... OK!");

export const connect = () => {
  console.log("Connection established");
};
