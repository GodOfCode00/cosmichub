import { Schema } from "mongoose";

export interface ITag {
  _id?: Schema.Types.ObjectId;
  name: String;
  created_at: Date;
  updated_at: Date;
};

export interface ITagUpdate extends Partial<ITag> {};

export interface ITagCreate extends ITagUpdate {
    name: String;
};
