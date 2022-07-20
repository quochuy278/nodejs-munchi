"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const opening = (req, res, next) => {
    res.send("Express + TypeScript Server is running");
};
const facebookUserInfo = (req, res, next) => {
    const accessToken = req.body.accessToken;
    const user_id = req.body.user_id;
    const authenticatedToken = jsonwebtoken_1.default.sign({ accessToken: accessToken, userId: user_id }, 'secret');
    return res.status(200).json(authenticatedToken);
};
module.exports = { opening, facebookUserInfo };
