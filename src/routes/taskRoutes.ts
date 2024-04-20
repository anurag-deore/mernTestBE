import { getAllTasks } from "../controllers/taskController";
import express from "express";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/tasks", isAuthenticated, getAllTasks);
};
