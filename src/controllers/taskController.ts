import { get } from "lodash";
import { getAllTasksByUser } from "../db/taskModel";
import express from "express";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = get(req, "currentUserId") as string;
    console.log("currentUserId", currentUserId);
    if (!currentUserId) {
      console.log("no user");
      return res.sendStatus(400);
    }
    const tasks = await getAllTasksByUser(currentUserId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.sendStatus(400);
  }
};
