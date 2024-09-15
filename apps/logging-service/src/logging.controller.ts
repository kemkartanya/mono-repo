import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggingService } from './logging.service';

@Controller()
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @MessagePattern('user.registered')
  handleUserRegistered(@Payload() data: any) {
    return this.loggingService.logUserRegistered(data);
  }

  @MessagePattern('user.login')
  handleUserLogin(@Payload() data: any) {
    return this.loggingService.logUserLogin(data);
  }

  @MessagePattern('user.logout')
  handleUserLogout(@Payload() data: any) {
    return this.loggingService.logUserLogout(data);
  }
}
