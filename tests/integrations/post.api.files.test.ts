import request from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import { clearDb } from "../factories";
import { connect } from "../../src/db/db";
import {
  CSVProcessingError,
  missingCSVData,
  noFileUploaded,
  notCSV,
} from "../../src/errors";
import { apiService } from "../../src/services/index";

describe("POST /api/files", () => {
  beforeAll(async () => {
    connect();
    clearDb();
  });

  afterEach(async () => {
    clearDb();
  });

  it("should upload a CSV file and return a success message", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from("sample,csv,data"), "sample.csv");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe("File uploaded and processed.");
  });

  it("should return a 400 error if no file is uploaded", async () => {
    const response = await request(app).post("/api/files");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.error).toBe(noFileUploaded().message);
  });

  it("should return a 400 error if an unsupported file type is uploaded", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from("sample,pdf,data"), "sample.pdf");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.error).toBe(notCSV().message);
  });

  it("should return a 400 error if CSV data is missing", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from(""), "sample.csv");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.error).toBe(missingCSVData().message);
  });

  it("should return a 500 error if CSV processing encounters an error", async () => {
    jest
      .spyOn(apiService, "postApiService")
      .mockRejectedValue(new Error("CSV processing error"));

    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from("sample,csv,data"), "sample.csv");

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.error).toBe(CSVProcessingError().message);
  });

  it("should return a 500 error if unexpected error occurs", async () => {
    jest
      .spyOn(apiService, "postApiService")
      .mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from("sample,csv,data"), "sample.csv");

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.error).toBe(CSVProcessingError().message);
  });
});
