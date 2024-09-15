import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('user.registered')
  handleUserRegistered(@Payload() data: any) {
    return this.notificationService.sendWelcomeNotification(data);
  }

  @MessagePattern('user.login')
  handleUserLogin(@Payload() data: any) {
    return this.notificationService.sendLoginNotification(data);
  }
}
