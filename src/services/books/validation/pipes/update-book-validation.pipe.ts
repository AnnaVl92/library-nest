import { Injectable } from '@nestjs/common';
import { updateBookSchema } from '../schemas';
import { BaseJoiValidationPipe } from './base-joi-validation.pipe';

@Injectable()
export class UpdateBookValidationPipe extends BaseJoiValidationPipe {
  constructor() {
    super(updateBookSchema, 'Validation failed for update book payload');
  }
}
