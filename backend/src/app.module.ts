import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../shared/configs/config';
import { LoggerModule } from '../shared/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}
@Module({
  imports: [
    UsersModule,
    CoursesModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
