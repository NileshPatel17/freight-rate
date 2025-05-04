import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { ZodSchema } from 'zod';

  @Injectable()
  export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
      const result = this.schema.safeParse(value);
      console.log({result})
      if (!result.success) {
        throw new BadRequestException(result.error.format());
      }
      return result.data;
    }
  }
