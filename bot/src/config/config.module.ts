import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ConfigService } from "./config.service";
import * as convict from "convict";
import { configSchema } from "./config.schema";

@Global()
@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    const config = convict(configSchema).validate({
      allowed: "strict"
    });
    const providers: Provider[] = [
      { provide: ConfigService, useValue: new ConfigService(config) }
    ];
    return {
      module: ConfigModule,
      providers: providers,
      exports: providers
    };
  }
}
