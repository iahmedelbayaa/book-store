import { BaseError } from "./base-error";

export class APIError extends BaseError {
    constructor(
        name: string,
        httpStatusCode: string,
        description = "Internal server error",
        isOperational = true
    ) {
        super(name, httpStatusCode, description, isOperational);
    }
}