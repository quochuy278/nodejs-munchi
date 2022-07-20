import express from "express";
import verifyToken from '../middleware/middleware'
const AuthController = require("../controller/auth-controller");

const router = express.Router();
router.get("/", AuthController.opening);

router.post("/facebook", verifyToken, AuthController.facebookUserInfo);

export default router
