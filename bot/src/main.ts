import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {});

  const logger = app.get(LoggerService);
  logger.log("Using correct logger");
  app.useLogger(logger);

  await app.listen(3000);

}

console.log("Bootstraping");
bootstrap();
