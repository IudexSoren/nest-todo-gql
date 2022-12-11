import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusArgs } from './dto/args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService
  ) {

  }

  @Query(() => [Todo], { name: "todos" })
  findAll(
    // The @Args decorator should not have a name because it will throw an error
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: "todo" })
  findOne(
    @Args("id", { type: () => Int }) id: number
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Query(() => Int, { name: "totalTodos" })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: "completedTodos" })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: "pendingTodos" })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  // This is an alternative to get the number of todos by state
  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      totalTodos: this.todoService.totalTodos
    }
  }

  @Mutation(() => Todo, { name: "createTodo" })
  createTodo(
    @Args("createTodoInput") createTodoInput: CreateTodoInput
  ): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: "updateTodo" })
  updateTodo(
    @Args("updateTodoInput") updateTodoInput: UpdateTodoInput
  ): Todo {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Todo, { name: "removeTodo" })
  removeTodo(
    @Args("id", { type: () => Int }) id: number
  ): Todo {
    return this.todoService.remove(id);
  }

}
