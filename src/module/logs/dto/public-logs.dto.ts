import { Expose } from 'class-transformer';

export class PublicLogsDto {
  @Expose()
  msg: string;
}
