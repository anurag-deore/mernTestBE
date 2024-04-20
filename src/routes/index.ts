import express from "express";
import authenticationRouter from "./authRouter";
import taskRouter from "./taskRoutes";
const router = express.Router();

export default (): express.Router => {
  authenticationRouter(router);
  taskRouter(router);
  return router;
};
