import { Request, Response } from "express";
import httpStatus from "http-status";
import { apiService } from "../services";
import { noFileUploaded, notCSV, CSVProcessingError } from "../errors";

async function postApiController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: noFileUploaded().message });
    }

    if (req.file.mimetype !== "text/csv") {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: notCSV().message });
    }

    const csvData = req.file.buffer.toString("utf8");
    await apiService.postApiService(csvData);

    return res
      .status(httpStatus.OK)
      .json({ message: "File uploaded and processed." });
  } catch (error) {
    if (error.name === "CSVProcessingError") {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    } else if (error.name === "MissingCSVData") {
      return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: CSVProcessingError().message });
    }
  }
}

function getApiController(req: Request, res: Response) {
  try {
    const searchTerm = req.query.q as string;

    if (req.path === "/api/users" && !searchTerm) {
      const allUsers = apiService.getApiService("");
      return res.status(httpStatus.OK).json(allUsers);
    }

    try {
      const searchResults = apiService.getApiService(searchTerm);

      return res.status(httpStatus.OK).json(searchResults);
    } catch (error) {
      if (error.name === "NoMatchingRecords") {
        return res.status(httpStatus.NOT_FOUND).json({ error: error.message });
      } else {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

export const apiController = {
  postApiController,
  getApiController,
};
