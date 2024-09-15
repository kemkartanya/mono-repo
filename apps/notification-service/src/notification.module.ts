import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from 'prisma/src/prisma.module';
import { KafkaModule } from 'libs/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
