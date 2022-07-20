import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const opening = (req: Request, res: Response, next: NextFunction) => {
  res.send("Express + TypeScript Server is running");
};

const facebookUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.body.accessToken;
  const user_id = req.body.user_id;
  const authenticatedToken = jwt.sign(
    { accessToken: accessToken, userId: user_id },
   'secret',
  );

   return res.status(200).json(authenticatedToken); 
};

module.exports = { opening, facebookUserInfo }; 
