import {Module} from "@nestjs/common";
import {BotService} from './bot.service';

import {Client, ClientOptions} from 'discord.js';
import {ConfigService} from "../config/config.service";

export type DiscordClientOptions = ClientOptions & { token: string };

const providers = [
    {
        provide: 'DISCORD_CLIENT_OPTIONS',
        useFactory: (configService: ConfigService): DiscordClientOptions => ({
            token: configService.get('discord').token,
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        }),
        inject: [ConfigService],
    },
    {
        provide: 'DISCORD_CLIENT',
        useFactory: async (
            discordClientOptions: DiscordClientOptions,
        ): Promise<Client> => {
            const {token, ...clientOptions} = discordClientOptions;
            const client = new Client(clientOptions);
            await client.login(token);
            return client;
        },
        inject: ['DISCORD_CLIENT_OPTIONS'],
    },
];

@Module({
    imports: [],
    providers: [BotService, ...providers],
    exports: [BotService, ...providers],
})
export class BotModule {
}
