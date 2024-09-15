import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(@Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka) {}

  async emit(topic: string, message: any) {
    return this.kafkaClient.emit(topic, JSON.stringify(message)).toPromise();
  }
}
