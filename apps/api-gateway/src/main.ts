import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { catchError, throwError, retry } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('API Gateway');

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters({
    catch(exception: any, host: any) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      logger.error(`Error occurred: ${exception.message}`, exception.stack);

      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'An error occurred while processing your request.',
      });
    },
  });

  // Add retry logic for microservice calls
  app.connectMicroservice({
    strategy: {
      send: (pattern: string, data: any) => {
        return this.client.send(pattern, data).pipe(
          retry(3),
          catchError((error) => {
            logger.error(
              `Failed to send message to microservice: ${error.message}`,
            );
            return throwError(() => error);
          }),
        );
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  logger.log('API Gateway is running on port 3000');
}
bootstrap();
