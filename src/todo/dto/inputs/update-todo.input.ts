import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateTodoInput {

  // GraphQL
  @Field(() => Int)
  // Class validator
  @IsInt()
  @Min(1)
  id: number;

  // GraphQL
  @Field(() => String, {
    description: "What needs to be done",
    nullable: true
  })
  // Class validator
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  description?: string;

  // GraphQL
  @Field(() => Boolean, { nullable: true })
  // Class validator
  @IsBoolean()
  @IsOptional()
  done?: boolean;

}