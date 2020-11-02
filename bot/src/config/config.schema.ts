import { Schema } from "convict";

export interface DiscordConfig {
  token: string
}

export interface HasuraConfig {
  host: string
  httpProtocol: string
  wsProtocol: string
  port: number
  path: string
}

export interface Config {
  discord: DiscordConfig
  hasura: HasuraConfig
  logLevel: string
}

const configSchema: Schema<Config> = {
  discord: {
    token: {
      format: String,
      default: null,
      env: 'DISCORD_TOKEN'
    },
  },
  hasura: {
    host: {
      format: String,
      default: null,
      env: 'HASURA_HOST'
    },
    httpProtocol: {
      format: String,
      default: 'http',
      env: 'HASURA_HTTP_PROTOCOL'
    },
    wsProtocol: {
      format: String,
      default: 'ws',
      env: 'HASURA_WS_PROTOCOL'
    },
    port: {
      format: Number,
      default: 80,
      env: 'HASURA_PORT'
    },
    path: {
      format: String,
      default: '/',
      env: 'HASURA_PATH'
    },
  },
  logLevel: {
    format: String,
    default: 'info',
    env: 'LOG_LEVEL'
  }
}

// Load environment dependent configuration
// config.loadFile(join(__dirname + '/../config/config.yml'))

export { configSchema }
