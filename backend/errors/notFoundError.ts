import CustomError from "./customError";
import HttpStatus from "http-status";
import IErrorMessage from "../interfaces/i.error.message";

export class NotFoundError extends CustomError {
  statusCode = HttpStatus.NOT_FOUND;

  constructor(message = "Not found") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize(): IErrorMessage[] {
    return [{ status: false, message: this.message }];
  }
}

