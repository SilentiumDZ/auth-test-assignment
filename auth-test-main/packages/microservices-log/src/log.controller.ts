import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LogService } from './log.service';
import { InLogDTO } from './dto/in.log.dto';

@Controller()
export class LogController {

  @Inject(LogService)
  private readonly logService: LogService;

  @EventPattern({ cmd: 'log' })
  async log(logData: InLogDTO) {
    await this.logService.logToCsv(logData);
  }
}
