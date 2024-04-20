import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
  console.log("server running on : http://localhost:5000");
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});

app.use("/", router());
