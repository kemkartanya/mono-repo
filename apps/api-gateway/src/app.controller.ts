import { Controller, All, Req, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('LOGGING_SERVICE') private loggingClient: ClientProxy,
  ) {}

  @All('auth/*')
  handleAuth(@Req() req: Request) {
    const path = req.path.slice(5); // Remove '/auth' prefix
    return this.authClient.send({ path, method: req.method }, req.body);
  }

  @All('logs/*')
  handleLogs(@Req() req: Request) {
    const path = req.path.slice(5); // Remove '/logs' prefix
    return this.loggingClient.send({ path, method: req.method }, req.body);
  }
}
