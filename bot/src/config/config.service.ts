import { Injectable } from '@nestjs/common';
import { Config as ConvictConfig } from 'convict';
import { Config } from "./config.schema";

@Injectable()
export class ConfigService {

  constructor(
    private readonly config: ConvictConfig<Config>
  ) { }

  get<K extends keyof Config | null | undefined>(key?: K): K extends null | undefined ? Config :Config[K] {
    return this.config.get<K>(key);
  }
}
