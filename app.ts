import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRouters from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRouters);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
