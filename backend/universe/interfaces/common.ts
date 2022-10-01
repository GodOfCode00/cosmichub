export interface IServerResponse<T> {
    // IServerResponse<IUser>
    status: boolean;
    content: {
      data: T; // data: IUser
      token?:string;
    };
  }
  
  export interface IServerError {
    status: false;
    errors: Array<{
      message: string;
    }>;
  }