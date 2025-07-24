import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundApi from "./middlewares/notFound";

const app: Application = express();

app.use(cors());

// parser

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Good Health!");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFoundApi);

export default app;
