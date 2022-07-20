"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const verifyToken = (req, res, next) => {
    const accessToken = req.body.accessToken;
    console.log(accessToken);
    let authenticated = false;
    if (accessToken) {
        axios_1.default
            .post(`${process.env.FACEBOOK_BASE_URL}/me?access_token=${accessToken}`)
            .then((res) => {
            if (res.data.success === true) {
                authenticated = true;
            }
        })
            .catch((error) => {
            console.log(error);
            res.json({
                message: "Authentication Failed",
            });
        });
        authenticated = true;
        next();
    }
    else {
        res.status(400).json({ "message": "something wrong happened" });
    }
};
exports.default = verifyToken;
