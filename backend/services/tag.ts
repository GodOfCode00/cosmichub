import {
  ITagUpdate,
  ITag,
  ITagCreate,
} from "../interfaces/tag";
import { tagModel } from "../models/tag";
import { IServerResponse } from "../universe/interfaces/common";

export class TagService {
  static async getAll<ITag>(): Promise<IServerResponse<ITag[]>> {
    const result = await tagModel.find<ITag>();
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async get<ITag>(
    id: string
  ): Promise<IServerResponse<ITag | null>> {
    const result = await tagModel.findById<ITag>(id);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async isTagExist(data: ITagUpdate): Promise<IServerResponse<ITag | null>> {
    const result = await tagModel.findOne<ITag>({name:data.name});
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async createTag(data: ITagCreate): Promise<IServerResponse<ITag | null>> {
    const {name} = data;
    const document: ITagCreate = {
        name,
        created_at: new Date(),
        updated_at: new Date()
    }
    const result = await tagModel.create<ITagCreate>(document);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
}