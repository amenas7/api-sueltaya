// path: api/auth
import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const route = Router();
const authController = new AuthController();
// api/auth/
route.post('/',  authController.login);
route.post('/email',  authController.email_recovery);
route.put('/changepass', authController.cambiar_password);

export default route;