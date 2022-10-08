import { model, Schema } from "mongoose";
import { database } from "../config/database";
import { IProblemTag } from "../interfaces/problem_tag";

const problem_tagSchema = new Schema<IProblemTag>({
  problem: { type: Schema.Types.ObjectId },
  tag: { type: Schema.Types.ObjectId },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

export const problem_tagModel = model<IProblemTag>(database.problem_tag, problem_tagSchema);
