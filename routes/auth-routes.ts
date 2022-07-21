import express from "express";
import {verifyFacebookToken, verifyGoogleToken} from "../middleware/middleware";
const AuthController = require("../controller/auth-controller");

const router = express.Router();
router.get("/", AuthController.opening);

router.post("/facebook", verifyFacebookToken, AuthController.facebookJwtToken);

router.post("/google", verifyGoogleToken, AuthController.googleJwtToken);

export default router
