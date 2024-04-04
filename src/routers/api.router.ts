import express from "express";
import { apiController } from "../controllers";
import multer from "multer";

const multerConfig = multer();
const apiRouter = express.Router();

apiRouter.post(
  "/files",
  multerConfig.single("file"),
  apiController.postApiController
);

apiRouter.get("/users", apiController.getApiController);

export { apiRouter };
