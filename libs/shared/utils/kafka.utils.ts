import {
  ClientKafka,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export function createKafkaClient(clientId: string): ClientKafka {
  return ClientProxyFactory.create({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId,
        brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
      },
      consumer: {
        groupId: `${clientId}-consumer`,
      },
    },
  }) as ClientKafka;
}
