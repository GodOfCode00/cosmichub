import { Schema } from "mongoose";

export interface IProblemTag {
  _id?: Schema.Types.ObjectId;
  problem: Schema.Types.ObjectId;
  tag: Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export interface IProblemTagUpdate extends Partial<IProblemTag> {}

export interface IProblemTagCreate extends IProblemTagUpdate {
  problem: Schema.Types.ObjectId;
  tag: Schema.Types.ObjectId;
}
