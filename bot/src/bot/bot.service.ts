import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Client} from 'discord.js';
import {LoggerService} from '../logger/logger.service';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly logger: LoggerService,
        @Inject('DISCORD_CLIENT') private readonly _client: Client,
    ) {
    }

    onModuleInit(): any {
        const guildCount = this._client.guilds.cache.size;
        this.logger.log(`Connected to ${guildCount} guilds`);
    }

    get client(): Client {
        return this._client;
    }
}
