import { NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { OAuth2Client, TokenPayload } from "google-auth-library";

export const verifyFacebookToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string = req.body.accessToken;
  console.log(accessToken);
  let authenticated: Boolean = false;
  if (accessToken) {
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
    authenticated = true;

    next();
  } else {
    res.status(400).json({ message: "something wrong happened" });
  }
};
export const verifyGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3NGI5MjhlZGY2NWE2ZjQ3MGM3MWIwYTI0N2JkMGY3YTRjOWNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODc5MDg4NTE5MDYxLTRka3JpaTc5MjRrdTNndXI2c2dpZ3Q5ODVtbjc2ZDZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODc5MDg4NTE5MDYxLTRka3JpaTc5MjRrdTNndXI2c2dpZ3Q5ODVtbjc2ZDZjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNzU0NDc2NTI1MjI3NzA1NjA4IiwiZW1haWwiOiJxdW9jaHV5MjcwODAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTHdYZ2RFbzZnTm40VW94MWZzY0dhQSIsIm5hbWUiOiJCdWkgUXVvYyBIdXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbndUdWd6UHVQOG1QbUo0ZmhPX2w3enpfOC14aWota2p4dVdFdVI9czk2LWMiLCJnaXZlbl9uYW1lIjoiQnVpIiwiZmFtaWx5X25hbWUiOiJRdW9jIEh1eSIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjU4NDE4NzQ5LCJleHAiOjE2NTg0MjIzNDksImp0aSI6IjEwMjVhOTc5OWMwN2FlYzlhZWY0NGRiNmVmMWU1Zjc1MTIxYzYzN2YifQ.lmWJin0bvkA2s-pjidZjPuWb-vA76fre1lS5LzM7SSR_1q2iSGX2PRd8DUiTcEq0kg6oiqvEFa1Db92T9rWOnqWQR631GwqJwpTZmpYeX65-06XuspVW5KIhHWnpRUhsGAbOJ4-JzJFnvn9jTWGsfUwayE5ejWMQe_tGFGz5OLt0kryvBqyVk4jTrzfndd0cSlA1SivBUopAiBJpVhIOweM3Bok8ra_V1mko14Awedb3bVKp3dbNvJMn7OCLSqxKinSIho3DJ2PlzleBIj1jaxtO52TDMtSinTn5lr8GlQ65wv6iKDwFYk9bA8PkAZkRWBwI7X_4SIXJJcKkpk4wLA";
  const CLIENT_ID =
    "879088519061-4dkrii7924ku3gur6sgigt985mn76d6c.apps.googleusercontent.com";
  const client = new OAuth2Client(CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload() as TokenPayload;
    const userId = payload["sub"];
    console.log(payload);
    console.log(ticket);
    next()
  } catch (error) {
    console.log(error);
  }
};

