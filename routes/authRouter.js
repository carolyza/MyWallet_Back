import { Router } from "express";
import { login, signup } from "../Controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import UserSchema from "../schemas/newUserSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();
authRouter.post("/signup", validateSchemaMiddleware(UserSchema), signup);

authRouter.post("/login", validateSchemaMiddleware(loginSchema), login);

export default authRouter;
