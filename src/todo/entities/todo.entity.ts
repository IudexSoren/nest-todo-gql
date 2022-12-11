import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType() // This is necessary for GraphQL to know that it is a type
export class Todo {

  @Field(() => Int)
  id: number;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  done: boolean = false;

}