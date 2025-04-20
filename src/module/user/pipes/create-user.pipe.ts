import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateUserDto, _metadata: ArgumentMetadata) {
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      // Roles
      if (value.roles[0]['id']) {
        value.roles = value.roles.map((item) => item.id);
      }
      // number[]
    }
    return value;
  }
}
