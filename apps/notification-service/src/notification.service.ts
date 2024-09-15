import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/src/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async sendWelcomeNotification(data: any) {
    // In a real-world scenario, you'd integrate with an email service or push notification service
    console.log(`Sending welcome notification to user ${data.userId}`);
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        type: 'WELCOME',
        message: 'Welcome to our platform!',
      },
    });
  }

  async sendLoginNotification(data: any) {
    console.log(`Sending login notification to user ${data.userId}`);
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        type: 'LOGIN',
        message: 'New login detected on your account.',
      },
    });
  }
}
