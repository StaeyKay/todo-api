import mongoose, { model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
