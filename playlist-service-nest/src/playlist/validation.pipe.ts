import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { GrpcInvalidArgumentException } from '../utils/grpc.exceptions';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    // only validate parameter called "data"
    if (metadata.data === 'data' && error) {
      const message = `data validation failed: ${error}`;
      throw new GrpcInvalidArgumentException(message);
    }

    return value;
  }
}
