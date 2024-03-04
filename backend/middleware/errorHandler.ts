import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";
import logger from "../config/logger";
import HttpStatus from "http-status";
import { NoTokenError } from "../errors/NoTokenError";

/**
 * A Error Handler middleware.
 */

const errorHandler = async (
  err: Error | CustomError | NoTokenError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handling custom errors/exceptions
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: false, errors: err.serialize() });
  }

  // console.log(err);
  logger.error(err);

  // Handling Prisma errors/exceptions
  if (err.constructor.name.includes("Prisma")) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: "Internal server error" });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
