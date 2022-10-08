import { model, Schema } from "mongoose";
import { database } from "../config/database";
import { ITag } from "../interfaces/tag";

const tagSchema = new Schema<ITag>({
  name: { type: String },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

export const tagModel = model<ITag>(database.tag, tagSchema);
