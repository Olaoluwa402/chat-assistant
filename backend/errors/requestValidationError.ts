import Joi from "joi";
import CustomError from "./customError";
import IErrorMessage from "./../interfaces/i.error.message";

interface CustomValidationError {
  field: string;
  message: string;
}

export class RequestValidationError extends CustomError {
  public statusCode = 400;
  public errors: CustomValidationError[] | any;

  constructor(validationResult: Joi.ValidationResult) {
    super("Invalid request parameters");
    this.errors = validationResult.error ? validationResult.error.details : [];

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize(): IErrorMessage[] {
    return this.errors.map((err: any) => {
      return { message: err.message, field: err.context?.key || "unknown" };
    });
  }
}
