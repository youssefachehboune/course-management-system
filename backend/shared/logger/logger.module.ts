import { Global, Logger, Module, Provider } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';

/**
 * Custom logger provider to configure the logger based on application configuration.
 */
const loggerProvider: Provider = {
  provide: Logger,
  useFactory: (configService: ConfigService) => {
    // Retrieve the log level from the configuration, defaulting to 'log' if not specified
    const level = configService.get<LogLevel>('LOGGER_LEVEL', 'log');
    const logger = new Logger();
    logger.localInstance.setLogLevels?.([level]);
    return logger;
  },
  inject: [ConfigService],
};

/**
 * Global Logger Module
 *
 * This module provides a globally available logger that can be injected into other services and modules.
 * The logger's log level is configured using the application's configuration service.
 */
@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
