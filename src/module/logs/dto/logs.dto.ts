import { IsNotEmpty, IsString } from 'class-validator';

export class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string;

  // @IsString()
  id: string;
}
