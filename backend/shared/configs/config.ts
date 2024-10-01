import type { Config } from './config.interface';

/**
 * Application configuration settings.
 *
 * This configuration file provides settings for various parts of the application including
 * NestJS server, CORS, Swagger documentation, and security options.
 */
const config: Config = {
  nest: {
    // The port on which the NestJS server will run.
    port: Number.parseInt(process.env.PORT ?? '3001', 10),
  },

  cors: {
    // Enable or disable Cross-Origin Resource Sharing (CORS).
    enabled: true,
  },

  swagger: {
    // Enable or disable Swagger documentation.
    enabled: true,
    // The title of the Swagger documentation.
    title: 'Course Management System',
    // The description of the Swagger documentation.
    description: 'The Course-Management-System API description',
    // The version of the Swagger documentation.
    version: '0',
    // The path where the Swagger documentation will be accessible.
    path: 'api',
  },

  security: {
    // JWT token expiration time.
    expiresIn: '2m',
    // JWT refresh token expiration time.
    refreshIn: '7d',
    // Bcrypt salt or round value for hashing passwords.
    bcryptSaltOrRound: 10,
  },
};

/**
 * Returns the application configuration settings.
 *
 * @return {Config} The configuration settings.
 */
const getConfig = (): Config => config;

export default getConfig;
