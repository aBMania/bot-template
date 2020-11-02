import {Module} from '@nestjs/common';
import {BotModule} from './bot/bot.module';
import {ConfigModule} from './config/config.module';
import {LoggerModule} from './logger/logger.module';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {TodoModule} from "./todo/todo.module";

@Module({
    imports: [
        BotModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        LoggerModule,
        TodoModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
