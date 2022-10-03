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
  dob: string | null;
  gender: string | null;
  links: string[] | null;
  created_at: Date;
  updated_at: Date;
};

export interface IUserUpdate extends Partial<IUser> {};

export type IUserView = Omit<
  IUser,'_id'|'password'|'created_at'|'updated_at'>;

export interface IUserSignUp extends IUserUpdate {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export interface IUserSignIn extends IUserUpdate {
  password: string;
};
