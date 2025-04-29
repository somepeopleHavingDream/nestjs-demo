import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { LogsDto } from './dto/logs.dto';
import { PublicLogsDto } from './dto/public-logs.dto';

@Controller('logs')
export class LogsController {
  @Post()
  @Serialize(PublicLogsDto)
  // @UseInterceptors(new SerializeInterceptor(PublicLogsDto))
  postTest(@Body() dto: LogsDto) {
    console.log('🚀 ~ LogsController ~ postTest ~ dto:', dto);
    return dto;
  }
}
