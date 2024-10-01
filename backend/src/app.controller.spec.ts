import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Logger } from '@nestjs/common';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, Logger],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
