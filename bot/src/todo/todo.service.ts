import {Injectable} from '@nestjs/common';
import {Todo, TodoInsertInput} from "../generated/graphql";
import {DbService} from "../db/db.service";
import {LoggerService} from "../logger/logger.service";

@Injectable()
export class TodoService {
    constructor(
        private readonly logger: LoggerService,
        private readonly dbService: DbService) {
    }

    public async addTodo(todo: TodoInsertInput): Promise<Todo> {
        this.logger.log(`Adding todo: ${JSON.stringify(todo)}`)

        const response = await this.dbService.sdk.AddTodo({
            todo
        })

        this.logger.log(`Adding todo response: ${JSON.stringify(response)}`)

        if (!response.data || !response.data.insert_todo_one) {
            if (response.errors) {
                for (let error of response.errors) {
                    this.logger.error(error.message)
                }
            }

            throw new Error('Error while adding todo')
        }
        return response.data.insert_todo_one
    }

    public async getTodos(): Promise<Todo[]> {
        this.logger.log(`Getting all todos`)

        const response = await this.dbService.sdk.GetTodos()

        this.logger.log(`Getting all todos response: ${JSON.stringify(response)}`)

        if (!response.data || !response.data.todo) {
            if (response.errors) {
                for (let error of response.errors) {
                    this.logger.error(error.message)
                }
            }

            throw new Error('Error while adding todo')
        }
        return response.data.todo
    }

    public async removeTodo(title: string): Promise<number> {
        this.logger.log(`Removing Todo(s) with title ${title}`)

        const response = await this.dbService.sdk.RemoveTodo({title})

        this.logger.log(`Remove todo response: ${JSON.stringify(response)}`)

        if (!response.data || !response.data.delete_todo) {
            if (response.errors) {
                for (let error of response.errors) {
                    this.logger.error(error.message)
                }
            }

            throw new Error('Error while removing todo')
        }

        return response.data.delete_todo.affected_rows
    }
}
