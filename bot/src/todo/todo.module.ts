import {TodoResolver} from "./todo.resolver";
import {TodoService} from "./todo.service";
import {TodoBotService} from "./todo.bot.service";
import {Module} from "@nestjs/common";
import {DbModule} from "../db/db.module";
import {LoggerModule} from "../logger/logger.module";
import {BotModule} from "../bot/bot.module";

@Module({
    imports: [DbModule, LoggerModule, BotModule],
    providers: [TodoResolver, TodoBotService, TodoService],
})
export class TodoModule {
}
