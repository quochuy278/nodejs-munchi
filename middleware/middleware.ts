import { NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
const verifyToken =  (req: Request, res: Response, next: NextFunction) => {
  const accessToken:string = req.body.accessToken;
  console.log(accessToken);
  let authenticated:Boolean = false;
  if (accessToken){
 axios
   .post(`${process.env.FACEBOOK_BASE_URL}/me?access_token=${accessToken}`)
   .then((res: AxiosResponse) => {
     if (res.data.success === true) {
       authenticated = true;
    
     }
   })
   .catch((error: Error) => {
     console.log(error);
     res.json({
       message: "Authentication Failed",
     });
   });
   authenticated = true
   
   next()
  }
 else {
    res.status(400).json({"message": "something wrong happened"})
 }
 
};

export default verifyToken;
