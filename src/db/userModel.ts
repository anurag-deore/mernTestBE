import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
  UserID: { type: String, required: true },
  Username: { type: String, required: true },
  PasswordHash: { type: String, required: true, select: false },
  Email: { type: String, required: true },
  UserType: { type: String, required: true },
});

const User = mongoose.model("users", UserSchema);

export const getUserById = async (id: string) => await User.findById(id);
export const getUserByEmail = (Email: string) =>
  User.findOne({
    Email,
  });

export const createUser = async (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());
