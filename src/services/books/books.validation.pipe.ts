import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const { type, metatype } = metadata;

    // validation of params
    if (type === 'param' && metatype === String) {
      if (
        typeof value !== 'string' ||
        !value ||
        !/^[0-9a-fA-F]{24}$/.test(value)
      ) {
        throw new BadRequestException('Invalid ID format');
      }
    }

    // validation of body
    if (type === 'body') {
      if (typeof value !== 'object' || value === null) {
        throw new BadRequestException('Invalid body');
      }
      const requiredFields = ['title', 'description', 'authors'];
      for (const field of requiredFields) {
        if (!value[field]) {
          throw new BadRequestException(`Missing required field: ${field}`);
        }
      }
    }
    return value;
  }
}
