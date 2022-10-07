import { CoreContext } from "@theinternetfolks/context";
import { Snowflake } from "@theinternetfolks/snowflake";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  IProblemUpdate,
  IProblem,
  IProblemCreate,
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

  static async createMyproblem(data: IProblem): Promise<IServerResponse<IProblem | null>>  {
    const me = CoreContext.get<IUser>("user");
    const {title,body,description,images} = data;
    const document: IProblemCreate = {
      user:me._id,
      title,
      body,
      description,
      images,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await problemModel.create<IProblemCreate>(document);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  
  static async updateMyproblem(data: IProblemUpdate) {
    const me = CoreContext.get<IUser>("user");
    const {title,body,description,images} = data;
    const document: IProblemUpdate = {
      updated_at: new Date()
    };
    if(typeof title !== 'undefined') {
      document.title = title;
    }
    if(typeof body !== 'undefined') {
      document.body = body;
    }
    if(typeof description !== 'undefined') {
      document.description = description;
    }
    if(typeof images !== 'undefined') {
      document.images = images;
    }
    const result = await problemModel.updateOne<IProblemUpdate>({user:me._id},document);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async removeMyProblem() {
    const me = CoreContext.get<IUser>("user");
    const result = await problemModel.remove({user:me._id});
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

}
