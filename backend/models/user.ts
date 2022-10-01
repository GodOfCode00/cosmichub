import { model, Schema } from "mongoose";
import { database } from "../config/database";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: Object },
  banner_image: { type: Object },
  gender: { type: String },
  links: { type: Array<String> },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

export const userModel = model<IUser>(database.user,userSchema);
