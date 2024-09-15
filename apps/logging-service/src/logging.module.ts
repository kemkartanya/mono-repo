import { Module } from '@nestjs/common';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';
import { PrismaModule } from 'prisma/src/prisma.module';
import { KafkaModule } from 'libs/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [LoggingController],
  providers: [LoggingService],
})
export class LoggingModule {}
