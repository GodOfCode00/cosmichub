import { ObjectId } from "mongoose";
import {
  IProblemTagUpdate,
  IProblemTag,
  IProblemTagCreate,
} from "../interfaces/problem_tag";
import { problem_tagModel } from "../models/problem_tag";
import { IServerResponse } from "../universe/interfaces/common";

export class ProblemTagService {
  static async getAll<IProblemTag>(): Promise<IServerResponse<IProblemTag[]>> {
    const result = await problem_tagModel.find<IProblemTag>();
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async get<IProblemTag>(
    id: string
  ): Promise<IServerResponse<IProblemTag | null>> {
    const result = await problem_tagModel.findById<IProblemTag>(id);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

  static async createProblemTag(
    data: IProblemTagCreate
  ): Promise<IServerResponse<IProblemTag | null>> {
    const { problem, tag } = data;
    const document: IProblemTagCreate = {
      problem,
      tag,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await problem_tagModel.create<IProblemTagCreate>(document);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }

  static async removeProblemTag(id: ObjectId) {
    const result = await problem_tagModel.remove().or([{_id:id},{problem:id},{tag:id}]);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
}
