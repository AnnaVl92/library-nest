import { Injectable } from '@nestjs/common';
import { createBookSchema } from '../schemas';
import { BaseJoiValidationPipe } from './base-joi-validation.pipe';

@Injectable()
export class CreateBookValidationPipe extends BaseJoiValidationPipe {
  constructor() {
    super(createBookSchema, 'Validation failed for create book payload');
  }
}
