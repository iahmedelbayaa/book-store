export class BaseError extends Error {
  httpStatusCode;
  description;
  isOperational;
  // Add the missing property httpStatusCode
  constructor(
    name: string,
    httpStatusCode: string,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name =name;
    this.httpStatusCode = httpStatusCode; // Assign the value to the property httpStatusCode
    this.description = description;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}