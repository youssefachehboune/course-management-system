import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    logger: Logger,
  ) {
    this.logger = logger;
    this.logger.log('Initializing app service');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
