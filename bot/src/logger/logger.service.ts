import { Injectable, LoggerService as LS } from "@nestjs/common";
import { createLogger, format, Logger, transports } from 'winston';
import { ConfigService } from "../config/config.service";

@Injectable()
export class LoggerService implements LS {
  private logger: Logger;

  constructor(private configService: ConfigService) {
    const colorizer = format.colorize();
    this.logger = createLogger({
      level: this.configService.get('logLevel'),
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) =>
          colorizer.colorize(
            info.level,
            `${info.timestamp} :: ${info.level} :: ${info.message}`,
          ),
        ),
      ),
      transports: [new transports.Console()],
    });

    console.log = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace || undefined);
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
