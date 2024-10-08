import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from '../shared/configs/config.interface';

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AllExceptionsFilter } from '../shared/filters/all-exceptions.filter';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
dotenv.config();

import { AppModule } from './app.module';
import { CoursesService } from './courses/courses.service';
/**
 * Create the NestJS application and set up global pipes and hooks.
 *
 * @return {Promise<INestApplication>} The created NestJS application.
 */
async function createApp(): Promise<INestApplication> {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Set up global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  return app;
}

/**
 * Configure global filters for the application.
 *
 * @param {INestApplication} app - The NestJS application instance.
 */
function configureFilters(app: INestApplication): void {
  // Set up All Exceptions Filter, and Response Interceptor

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
}

/**
 * Configure Swagger for API documentation.
 *
 * @param {INestApplication} app - The NestJS application instance.
 * @param {SwaggerConfig} swaggerConfig - The configuration for Swagger.
 */
function configureSwagger(
  app: INestApplication,
  swaggerConfig: SwaggerConfig,
): void {
  // Configure Swagger for API documentation
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth() // Add Bearer Auth support
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }
}

/**
 * Configure CORS for the application.
 *
 * @param {INestApplication} app - The NestJS application instance.
 * @param {CorsConfig} corsConfig - The configuration for CORS.
 */
function configureCors(app: INestApplication, corsConfig: CorsConfig): void {
  // Enable CORS if configured
  if (corsConfig?.enabled) {
    app.enableCors(
      {origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,}
    );
  }
}

/**
 * Bootstrap the NestJS application.
 *
 * @return {Promise<void>}
 */
export async function bootstrap(startServer = true) {
  const app = await createApp();

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const courseService = app.get(CoursesService);
  configureFilters(app);
  if (swaggerConfig) {
    configureSwagger(app, swaggerConfig);
  }
  if (corsConfig) {
    configureCors(app, corsConfig);
  }

  // Start the server
  if (startServer) {
    await app.listen(nestConfig?.port ?? 3001);
    Logger.log(`Server running on ${nestConfig?.port ?? 3001}`, 'Bootstrap');
  }
  return { app, courseService };
}

bootstrap().catch((error: unknown) => {
  if (error instanceof Error) {
    Logger.error(`Error starting server: ${error.message}`, 'Bootstrap');
  } else {
    Logger.error('Unknown error starting server', 'Bootstrap');
  }
});
