import { CoreContext } from "@theinternetfolks/context";
import { Snowflake } from "@theinternetfolks/snowflake";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  IUser,
  IUserSignIn,
  IUserSignUp,
  IUserUpdate,
  IUserView,
} from "../interfaces/user";
import { userModel } from "../models/user";
import PlatformError from "../universe/errors/PlatformError";
import { IServerResponse } from "../universe/interfaces/common";

export class UserService {
  static async getAll<IUserView>(): Promise<IServerResponse<IUserView[]>> {
    const result = await userModel.find<IUserView>();
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async get<IUserView>(
    id: string
  ): Promise<IServerResponse<IUserView | null>> {
    const result = await userModel.findById<IUserView>(id);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async getMe(): Promise<IServerResponse<IUser | null>> {
    const user = CoreContext.get<IUser>("user");
    const result = await userModel.findById<IUser>(user._id);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async signup(data: IUserSignUp): Promise<IServerResponse<IUserView>> {
    const {
      firstname,
      lastname,
      username = "",
      email,
      password,
      image = null,
      banner_image = null,
      gender = null,
      dob = null,
      links = [],
    } = data;

    const old = await userModel.findOne<IUser>({ $or: [{ email, username }] });

    if (old) {
      throw new PlatformError<string[]>(400, [
        "User Already Exist. Please Login",
      ]);
    }

    const enPassword = await hash(password, 10);

    const document = {
      firstname,
      lastname,
      username: username === "" ? firstname + Snowflake.generate() : username,
      email,
      password: enPassword,
      image,
      banner_image,
      gender,
      dob,
      links,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // validation

    const result: IUserView = await userModel.create(document);
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async signIn(data: IUserSignIn): Promise<IServerResponse<IUserUpdate>> {
    const { username = "", password } = data;
    let user = await userModel.findOne<IUser>({
      $or: [{ email: username }, { username }],
    });
    //let user = await userModel.findOne<IUser>({ username });
    if (user && (await compare(password, user.password))) {
      let document:IUserUpdate = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        gender: user.gender,
        links: user.links,
        image: null,
        banner_image: null,
        dob: null
      };
      const token = sign(
        { _id: user._id, ...document },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "5h",
        }
      );
      document.image=user.image;
      document.banner_image=user.banner_image;
      document.dob=user.dob;
      let give: IServerResponse<IUserUpdate> = {
        status: true,
        content: {
          data: document,
          token,
        },
      };
      return give;
    }
    throw new PlatformError<string[]>(401, ["Invalid Credentials"]);
  }
  static async updateMe(data: IUserUpdate) {
    const user = CoreContext.get<IUser>("user");
    const {
      firstname,
      lastname,
      username,
      email,
      image,
      banner_image,
      gender,
      dob,
      links,
    } = data;
    const document: IUserUpdate = {};
    if (typeof firstname !== "undefined") {
      document.firstname = firstname;
    }
    if (typeof lastname !== "undefined") {
      document.lastname = lastname;
    }
    if (typeof username !== "undefined") {
      document.username = username;
    }
    if (typeof email !== "undefined") {
      document.email = email;
    }
    if (typeof image !== "undefined") {
      document.image = image;
    }
    if (typeof banner_image !== "undefined") {
      document.banner_image = banner_image;
    }
    if (typeof gender !== "undefined") {
      document.gender = gender;
    }
    if (typeof dob !== "undefined") {
      document.dob = dob;
    }
    if (typeof links !== "undefined") {
      document.links = links;
    }
    const result = await userModel.updateOne(
      { _id: user._id },
      { ...document, updated_at: new Date().toISOString() }
    );
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
  static async removeMe() {
    const user = CoreContext.get<IUser>("user");
    const result = await userModel.remove({ _id: user._id });
    return {
      status: true,
      content: {
        data: result,
      },
    };
  }
}
