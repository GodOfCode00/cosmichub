import { Schema } from "mongoose";

export interface IProblem {
  _id?: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  title: String;
  body: String;
  description: String | null;
  images: Object[] | null;
  created_at: Date;
  updated_at: Date;
};

export interface IProblemUpdate extends Partial<IProblem> {
  tags?: String[];
};

export interface IProblemCreate extends IProblemUpdate {
  user: Schema.Types.ObjectId;
  title: String;
  body: String;
  description: String | null;
  images: Object[] | null;
  tags: String[];
};

export type IProblemView = Omit<
  IProblem,'created_at'|'updated_at'>;
