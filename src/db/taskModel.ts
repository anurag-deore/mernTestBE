// TaskID: uuidv4(),
// UserID: randomUserID(users),
// Title: `Task ${Math.random().toString(36).substring(2, 15)}`,
// Description: `Description ${Math.random().toString(36).substring(2, 100)}`,
// Priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
// Status: ["pending", "in progress", "completed"][
//   Math.floor(Math.random() * 3)
// ],
// CreationDate: randomDate(),
// DueDate: randomDate(),
// Tags: `Tag_${Math.random().toString(36).substring(7)}`,

import mongoose, { Schema } from "mongoose";

export const TaskSchema = new Schema({
  TaskID: { type: String, required: true },
  UserID: { type: String, required: true },
  Title: { type: String },
  Description: { type: String },
  Priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  Status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  CreationDate: { type: String },
  DueDate: { type: String },
  Tags: { type: Array },
});

const Task = mongoose.model("tasks", TaskSchema);
export const getAllTasksByUser = (userId: string) =>
  Task.find({
    UserID: userId.toString(),
  });

export const getTaskById = async (id: string) => await Task.findById(id);

export const createTask = async (values: Record<string, any>) =>
  new Task(values).save().then((task) => task.toObject());
