"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const AuthController = require("../controller/auth-controller");
const router = express_1.default.Router();
router.get("/", AuthController.opening);
router.post("/facebook", middleware_1.default, AuthController.facebookUserInfo);
exports.default = router;
