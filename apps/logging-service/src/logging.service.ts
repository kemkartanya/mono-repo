import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/src/prisma.service';

@Injectable()
export class LoggingService {
  constructor(private readonly prisma: PrismaService) {}

  async logUserRegistered(data: any) {
    return this.prisma.log.create({
      data: {
        event: 'USER_REGISTERED',
        userId: data.userId,
        details: JSON.stringify(data),
      },
    });
  }

  async logUserLogin(data: any) {
    return this.prisma.log.create({
      data: {
        event: 'USER_LOGIN',
        userId: data.userId,
        details: JSON.stringify(data),
      },
    });
  }

  async logUserLogout(data: any) {
    return this.prisma.log.create({
      data: {
        event: 'USER_LOGOUT',
        userId: data.userId,
        details: JSON.stringify(data),
      },
    });
  }
}
