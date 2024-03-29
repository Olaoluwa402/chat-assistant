import IErrorMessage from "../interfaces/i.error.message";
import CustomError from "./customError";
import HttpStatus from "http-status";

export class NoTokenError extends CustomError {
  statusCode = HttpStatus.UNAUTHORIZED;

  constructor() {
    super("Authentication Required");

    Object.setPrototypeOf(this, NoTokenError.prototype);
  }

  serialize(): IErrorMessage[] {
    return [{ status: false, message: this.message }];
  }
}


