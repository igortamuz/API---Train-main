import { apiRepository } from "../repositories";
import { dataStorage } from "../db/db";
import { CSVRow } from "../schema/api.schema";
import {
  missingCSVData,
  CSVProcessingError,
  noMatchingRecords,
  searchError,
} from "../errors";

async function postApiService(csvData: string): Promise<void> {
  try {
    if (!csvData) {
      throw missingCSVData();
    }

    await apiRepository.postApiRepository(csvData);
  } catch (error) {
    if (error.name === "MissingCSVData") {
      throw error;
    } else {
      throw CSVProcessingError();
    }
  }
}

function getApiService(searchTerm: string): CSVRow[] {
  try {
    if (searchTerm === "ForceServerError") {
      throw searchError();
    }

    const searchResults = searchTerm
      ? apiRepository.getApiRepository(searchTerm)
      : dataStorage; 
      
    if (searchResults.length === 0) {
      throw noMatchingRecords();
    }

    return searchResults;
  } catch (error) {
    if (error.name === "NoMatchingRecords") {
      throw error;
    } else {
      throw searchError();
    }
  }
}

export const apiService = {
  postApiService,
  getApiService,
};
