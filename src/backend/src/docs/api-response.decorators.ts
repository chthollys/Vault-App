import { applyDecorators, type Type } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger";

type SuccessResponseOptions = {
  type?: Type<unknown>;
  isArray?: boolean;
  description?: string;
};

const errorResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean", example: false },
    message: { type: "string", example: "Request failed" },
  },
  required: ["success", "message"],
};

function buildSuccessSchema({ type, isArray }: SuccessResponseOptions = {}) {
  if (!type) {
    return {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        data: { type: "object", nullable: true, additionalProperties: true },
        message: { type: "string", nullable: true, example: "Operation successful" },
      },
      required: ["success"],
    };
  }

  return {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: isArray
        ? { type: "array", items: { $ref: getSchemaPath(type) } }
        : { $ref: getSchemaPath(type) },
      message: { type: "string", nullable: true, example: "Operation successful" },
    },
    required: ["success", "data"],
  };
}

export function ApiOkWrappedResponse(options: SuccessResponseOptions = {}) {
  const decorators: Array<ClassDecorator | MethodDecorator> = [];
  if (options.type) {
    decorators.push(ApiExtraModels(options.type));
  }
  decorators.push(
    ApiOkResponse({
      description: options.description ?? "Successful response",
      schema: buildSuccessSchema(options),
    }),
  );
  return applyDecorators(...decorators);
}

export function ApiCreatedWrappedResponse(options: SuccessResponseOptions = {}) {
  const decorators: Array<ClassDecorator | MethodDecorator> = [];
  if (options.type) {
    decorators.push(ApiExtraModels(options.type));
  }
  decorators.push(
    ApiCreatedResponse({
      description: options.description ?? "Resource created successfully",
      schema: buildSuccessSchema(options),
    }),
  );
  return applyDecorators(...decorators);
}

export function ApiCommonErrorResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: "Bad request",
      schema: errorResponseSchema,
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
      schema: errorResponseSchema,
    }),
    ApiForbiddenResponse({
      description: "Forbidden",
      schema: errorResponseSchema,
    }),
    ApiNotFoundResponse({
      description: "Resource not found",
      schema: errorResponseSchema,
    }),
    ApiConflictResponse({
      description: "Conflict",
      schema: errorResponseSchema,
    }),
  );
}
