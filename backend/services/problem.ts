import { CoreContext } from "@theinternetfolks/context";
import { Snowflake } from "@theinternetfolks/snowflake";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  IProblemUpdate,
  IProblem,
} from "../interfaces/problem";
import { IUser } from "../interfaces/user";
import { problemModel } from "../models/problem";
import PlatformError from "../universe/errors/PlatformError";
import { IServerResponse } from "../universe/interfaces/common";

export class ProblemService {
  static async getAll<IProblem>(): Promise<IServerResponse<IProblem[]>> {
    const result = await problemModel.find<IProblem>();
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async get<IProblem>(
    id: string
  ): Promise<IServerResponse<IProblem | null>> {
    const result = await problemModel.findById<IProblem>(id);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async getMyProblems(): Promise<IServerResponse<IProblem[]>> {
    const me = CoreContext.get<IUser>("user");
    const result = await problemModel.find<IProblem>({user:me._id});
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

  static async createMyproblem(data: IProblem) {
    const me = CoreContext.get<IUser>("user");
    const {title,body,description,images} = data;

  }
  
}
