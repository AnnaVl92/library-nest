import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { Schema } from 'joi';

interface ValidationErrorItem {
  field: string;
  message: string;
}

@Injectable()
export class BaseJoiValidationPipe<TOutput = unknown> implements PipeTransform<
  unknown,
  TOutput
> {
  constructor(
    private readonly schema: Schema<TOutput>,
    private readonly errorMessage: string,
  ) {}

  transform(value: unknown): TOutput {
    const result = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (result.error) {
      const errors: ValidationErrorItem[] = result.error.details.map(
        (detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }),
      );

      throw new BadRequestException({
        message: this.errorMessage,
        errors,
      });
    }

    return result.value;
  }
}
