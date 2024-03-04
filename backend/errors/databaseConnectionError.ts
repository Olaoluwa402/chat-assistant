import CustomError from "./customError";
import IErrorMessage from "../interfaces/i.error.message";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to Database";

  constructor() {
    super("Error connecting to DB");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize(): IErrorMessage[] {
    return [{ status: false, message: this.reason }];
  }
}
