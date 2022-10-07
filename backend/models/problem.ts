import { model, Schema } from "mongoose";
import { database } from "../config/database";
import { IProblem } from "../interfaces/problem";

const problemSchema = new Schema<IProblem>({
  user: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  description: { type: String },
  images: { type: Array<Object> },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

export const problemModel = model<IProblem>(database.problem, problemSchema);
