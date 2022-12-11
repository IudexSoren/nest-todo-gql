import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

  @Query(
    () => String, // This means that it will return a String
    {
      description: "Hello nigga message",
      name: "hello" // If this name is not provided, it will take the name of the function
    }
  )
  helloWorld(): string {
    return "Hello nigga";
  }

  @Query(() => Float, { name: "randomNumber" })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: "Generates a random integer number from 0 to the specified value. If it's not specified, it will be 6 by default.",
    name: "randomFromZeroTo"
  })
  getRandomFromZeroTo(
    @Args("to", {
      defaultValue: 6,
      type: () => Int,
    }) to: number // The @Args() decorator is necessary for GraphQL to recognize it
  ): number {
    return Math.floor(Math.random() * to);
  }

}
