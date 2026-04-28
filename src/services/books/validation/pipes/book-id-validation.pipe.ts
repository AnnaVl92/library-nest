import { Injectable } from '@nestjs/common';
import { idSchema } from '../schemas';
import { BaseJoiValidationPipe } from './base-joi-validation.pipe';

@Injectable()
export class BookIdValidationPipe extends BaseJoiValidationPipe<string> {
  constructor() {
    super(idSchema, 'Invalid book id format');
  }
}
