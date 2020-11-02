import {Field, InputType, ObjectType, OmitType} from "@nestjs/graphql";

@ObjectType()
export class Todo {
    @Field()
    public content: string;
    @Field()
    public title: string;
    @Field()
    public id: string;
}

@InputType()
export class TodoInput extends OmitType(Todo, ['id'], InputType) {
}
