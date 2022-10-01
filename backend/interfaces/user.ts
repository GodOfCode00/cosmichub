import { Schema } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  image: Object | null;
  banner_image: Object | null;
  gender: string | null;
  links: string[] | null;
  created_at: Date;
  updated_at: Date;
};

export interface IUserUpdate extends Partial<IUser> {};

export type IUserView = Pick<
  IUser,
  "firstname" | "lastname" | "username" | "email" | "gender" | "links"
>;

export interface IUserSignUp extends IUserUpdate {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export interface IUserSignIn extends IUserUpdate {
  password: string;
};
