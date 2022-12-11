import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

  // GraphQL
  @Field(() => String, { description: "What needs to be done" })
  // Class-validator
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  description: string;

}