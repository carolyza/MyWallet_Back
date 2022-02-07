import { Router } from "express";
import { deposit, withdraw } from "../Controllers/balanceController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const balanceRouter = Router();

balanceRouter.use(validateTokenMiddleware);

balanceRouter.post("/entrada", deposit);

balanceRouter.post("/saida", withdraw);

balanceRouter.get("/entrada", deposit);

balanceRouter.get("/saida", withdraw);

export default balanceRouter;
