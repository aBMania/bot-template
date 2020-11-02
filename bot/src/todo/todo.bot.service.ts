import {Injectable} from '@nestjs/common';
import {LoggerService} from "../logger/logger.service";
import {BotService} from "../bot/bot.service";
import {Message} from "discord.js";
import {TodoService} from "./todo.service";
import {Todo} from "../generated/graphql";

@Injectable()
export class TodoBotService {
    constructor(
        private readonly logger: LoggerService,
        private readonly todoService: TodoService,
        private readonly botService: BotService) {
        this.botService.client.on('message', message => this.handleMessage(message))
    }


    private async handleMessage(message: Message): Promise<void> {
        if (message.content.startsWith('!todo get')) {
            await this.handleGetTodos(message)
        }

        if (message.content.startsWith('!todo add')) {
            await this.handleAddTodo(message)
        }

        if (message.content.startsWith('!todo done')) {
            await this.handleTodoDone(message)
        }
    }

    private async handleGetTodos(message: Message): Promise<void> {
        const todos = await this.todoService.getTodos();

        const header = 'Todo list:'
        const formatRow = (todo: Todo) => `\n- [${todo.title}] ${todo.content}`

        const responseText = todos.reduce(
            (pre, current) => `${pre}${formatRow(current)}`,
            header
        )

        await message.reply(responseText)
    }

    private async handleAddTodo(message: Message): Promise<void> {
        const content = message.cleanContent.replace('!todo add ', '')

        await this.todoService.addTodo({
            title: content.substr(0, content.indexOf(' ')),
            content: content.substr(content.indexOf(' ') + 1)
        })

        const responseText = 'Todo added';

        await message.reply(responseText)
    }

    private async handleTodoDone(message: Message): Promise<void> {
        const title = message.cleanContent.replace('!todo done ', '')

        const numberOfTodoRemoved = await this.todoService.removeTodo(title)

        const responseText = numberOfTodoRemoved === 0 ? `No todo removed` : `${numberOfTodoRemoved} Todo${numberOfTodoRemoved > 1 ? 's' : ''} removed`

        await message.reply(responseText)
    }
}
