/**
 * Represents the overall application configuration.
 */
export interface Config {
  /** Configuration related to the NestJS application. */
  nest: NestConfig;

  /** Configuration related to CORS (Cross-Origin Resource Sharing). */
  cors: CorsConfig;

  /** Configuration related to Swagger documentation. */
  swagger: SwaggerConfig;

  /** Configuration related to application security. */
  security: SecurityConfig;
}

/**
 * Represents the configuration for the NestJS application.
 */
export interface NestConfig {
  /** The port on which the application will run. */
  port: number;
}

/**
 * Represents the configuration for CORS.
 */
export interface CorsConfig {
  /** Flag to enable or disable CORS. */
  enabled: boolean;
}

/**
 * Represents the configuration for Swagger documentation.
 */
export interface SwaggerConfig {
  /** Flag to enable or disable Swagger documentation. */
  enabled: boolean;

  /** The title of the Swagger documentation. */
  title: string;

  /** The description of the Swagger documentation. */
  description: string;

  /** The version of the Swagger documentation. */
  version: string;

  /** The path at which Swagger documentation will be available. */
  path: string;
}

/**
 * Represents the configuration for application security.
 */
export interface SecurityConfig {
  /** The expiration time for tokens. */
  expiresIn: string;

  /** The refresh time for tokens. */
  refreshIn: string;

  /** The salt or number of rounds for bcrypt hashing. */
  bcryptSaltOrRound: string | number;
}
