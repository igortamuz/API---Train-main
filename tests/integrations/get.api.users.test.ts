import request from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import {
  missingSearchTerm,
  noMatchingRecords,
  searchError,
} from "../../src/errors";
import { apiService } from "../../src/services/index";

describe("GET /api/users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return search results for valid search term", async () => {
    const searchTerm = "John";
    const expectedSearchResults = [
      {
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      },
      {
        name: "Jane Smith",
        city: "Los Angeles",
        country: "USA",
        favorite_sport: "Soccer",
      },
    ];

    jest
      .spyOn(apiService, "getApiService")
      .mockReturnValue(expectedSearchResults);

    const response = await request(app).get(`/api/users?q=${searchTerm}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedSearchResults);
  });

  it("should return a 200 when getting all records", async () => {
    const expectedSearchResults = [
      {
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      },
      {
        name: "Jane Smith",
        city: "Los Angeles",
        country: "USA",
        favorite_sport: "Soccer",
      },
    ];

    jest
    .spyOn(apiService, "getApiService")
    .mockReturnValue(expectedSearchResults);
    
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedSearchResults);
  });

  it("should return a 404 error if no matching records are found", async () => {
    const searchTerm = "NonExistentUser";

    jest.spyOn(apiService, "getApiService").mockImplementation(() => {
      throw noMatchingRecords();
    });

    const response = await request(app).get(`/api/users?q=${searchTerm}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.error).toBe(noMatchingRecords().message);
  });

  it("should return a 500 error if an error occurs during search", async () => {
    const searchTerm = "ForceServerError";

    jest.spyOn(apiService, "getApiService").mockImplementation(() => {
      throw searchError();
    });

    const response = await request(app).get(`/api/users?q=${searchTerm}`);

    expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.error).toBe(searchError().message);
  });
});
