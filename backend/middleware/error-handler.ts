import { NextFunction, Request, Response } from "express";
import PlatformError from "../universe/errors/PlatformError";

const ErrorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.log(error);
    if (error instanceof PlatformError) {
      return response.status(error.statusCode).json({
        status: false,
        errors: error.serialize(),
      });
    }
    return response.status(500).json({
      status: false,
      errors: [
        {
          message: error.message || "Something unexpected happened!",
        },
      ],
    });
  };

export default ErrorHandler;
