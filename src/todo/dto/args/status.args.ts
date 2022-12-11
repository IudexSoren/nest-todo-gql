import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {

  // GraphQL
  @Field(() => Boolean, { nullable: true })
  // Class-validator
  @IsBoolean()
  @IsOptional()
  status?: boolean

}