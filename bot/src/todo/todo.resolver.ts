import {ConfigService} from "../config/config.service";
import {Mutation, Query, Resolver} from "@nestjs/graphql";
import {Todo, TodoInput} from "./todo.types";
import {TodoService} from "./todo.service";

@Resolver(of => Todo)
export class TodoResolver {
    constructor(private configService: ConfigService,
                private todoService: TodoService) {
    }

    @Mutation(returns => Todo)
    public async addTodo(todoinput: TodoInput): Promise<Todo> {
        return await this.todoService.addTodo(todoinput)
    }

    @Query(returns => [Todo])
    public async getTodos(): Promise<Todo[]> {
        return await this.todoService.getTodos()
    }
}
