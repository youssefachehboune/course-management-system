import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'shared/configs/config';
import { LoggerModule } from 'shared/logger/logger.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
