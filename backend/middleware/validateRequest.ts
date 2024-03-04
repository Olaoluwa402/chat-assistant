import {
  Router,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import Joi from "joi";
import { BadRequestError } from "../errors";

export enum RequestType {
  "BODY" = "BODY",
  "PARAM" = "PARAM",
  "QUERY" = "QUERY",
}

function validateRequest(
  Schema: Joi.Schema,
  type: RequestType,
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      if (type === RequestType.QUERY) {
        const value = await Schema.validateAsync(req.query, validationOptions);
        req.query = value;
        return next();
      }

      if (type === RequestType.PARAM) {
        const value = await Schema.validateAsync(req.params, validationOptions);
        req.params = value;
        return next();
      }
      const value = await Schema.validateAsync(req.body, validationOptions);
      req.query = value;
      return next();
    } catch (e: any) {
      const errors: string[] = [];

      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });

      next(new BadRequestError(errors.toString()));
    }
  };
}

export default validateRequest;
