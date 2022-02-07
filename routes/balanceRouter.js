import { Router } from "express";
import {
  postDeposit,
  postWithdraw,
  getDeposit,
  getWithdraw,
} from "../Controllers/balanceController.js";
import { validateExtractMiddleware } from "../middlewares/validateExtractMiddleware.js";

const balanceRouter = Router();

balanceRouter.post("/entrada", validateExtractMiddleware, postDeposit);

balanceRouter.post("/saida", validateExtractMiddleware, postWithdraw);

balanceRouter.get("/entrada", getDeposit);

balanceRouter.get("/saida", getWithdraw);

export default balanceRouter;
