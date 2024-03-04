import IErrorMessage from "../interfaces/i.error.message";
import CustomError from "./customError";
import httpStatus from "http-status";

export class TokenValidationError extends CustomError {
  statusCode = httpStatus.UNAUTHORIZED;

  constructor() {
    super("Invalid Token or Token Expired");

    Object.setPrototypeOf(this, TokenValidationError.prototype);
  }

  serialize(): IErrorMessage[] {
    return [{ status: false, message: this.message }];
  }
}

