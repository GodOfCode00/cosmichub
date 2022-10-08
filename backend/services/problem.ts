import { CoreContext } from "@theinternetfolks/context";
import { ObjectId } from "mongoose";
import {
  IProblemUpdate,
  IProblem,
  IProblemCreate,
} from "../interfaces/problem";
import { IUser } from "../interfaces/user";
import { problemModel } from "../models/problem";
import { IServerResponse } from "../universe/interfaces/common";
import { ProblemTagService } from "./problem_tag";
import { TagService } from "./tag";

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
    const result = await problemModel.find<IProblem>({ user: me._id });
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

  static async createMyproblem(
    data: IProblemCreate
  ): Promise<IServerResponse<IProblem | null>> {
    const me = CoreContext.get<IUser>("user");
    const { title, body, description = null, images = [], tags = [] } = data;
    const document: IProblem = {
      user: me._id,
      title,
      body,
      description,
      images,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await problemModel.create<IProblemCreate>(document);

    if (tags.length > 0) {
      for (let tag of tags) {
        let {
          content: { data },
        } = await TagService.isTagExist({ name: tag });
        if (data) {
          ProblemTagService.createProblemTag({
            problem: result._id,
            tag: data._id as ObjectId,
          });
        }
        else {
          let {content:{data}}= await TagService.createTag({name:tag});
          ProblemTagService.createProblemTag({
            problem: result._id,
            tag: data?._id as ObjectId,
          });
        }
      }
    }
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

  static async updateMyproblem(data: IProblemUpdate) {
    const me = CoreContext.get<IUser>("user");
    const { title, body, description, images, tags } = data;
    const document: IProblemUpdate = {
      updated_at: new Date(),
    };
    if (typeof title !== "undefined") {
      document.title = title;
    }
    if (typeof body !== "undefined") {
      document.body = body;
    }
    if (typeof description !== "undefined") {
      document.description = description;
    }
    if (typeof images !== "undefined") {
      document.images = images;
    }
    const result = await problemModel.updateOne<IProblemUpdate>(
      { user: me._id },
      document
    );
    const problem = await problemModel.findOne({user:me._id});
    if (tags && tags.length > 0) {
      if(problem?._id) {
        let wait = await ProblemTagService.removeProblemTag(problem?._id);
        for (let tag of tags) {
          let {
            content: { data },
          } = await TagService.isTagExist({ name: tag });
          if (data) {
            ProblemTagService.createProblemTag({
              problem: problem._id,
              tag: data._id as ObjectId,
            });
          }
          else {
            let {content:{data}}= await TagService.createTag({name:tag});
            ProblemTagService.createProblemTag({
              problem: problem._id,
              tag: data?._id as ObjectId,
            });
          }
        }
      }
    }
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async removeMyProblem() {
    const me = CoreContext.get<IUser>("user");
    const result = await problemModel.remove({ user: me._id });
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
}
