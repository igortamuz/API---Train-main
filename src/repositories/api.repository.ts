import { dataStorage } from "../db/db";
import { CSVRow } from "../schema/api.schema";

async function postApiRepository(csvData: string): Promise<void> {
  const rows = csvData.split("\n");

  for (let i = 1; i < rows.length; i++) {
    const rowWithoutCarriageReturn = rows[i].replace("\r", "");

    const values = rowWithoutCarriageReturn.split(",");

    const csvRow: CSVRow = {
      name: values[0],
      city: values[1],
      country: values[2],
      favorite_sport: values[3],
    };

    dataStorage.push(csvRow);
  }
}

function getApiRepository(searchTerm: string): CSVRow[] {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const searchResults = dataStorage
    .filter((row) => {
      return Object.values(row).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(lowerSearchTerm)
      );
    })
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex((v) => JSON.stringify(v) === JSON.stringify(value))
    );

  return searchResults;
}

export const apiRepository = {
  postApiRepository,
  getApiRepository,
};
