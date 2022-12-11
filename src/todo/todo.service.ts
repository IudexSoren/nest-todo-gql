import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {
      id: 1,
      description: "Piedra del Alma",
      done: false
    },
    {
      id: 2,
      description: "Piedra del Tiempo",
      done: false
    },
    {
      id: 3,
      description: "Piedra del Espacio",
      done: true
    },
    {
      id: 4,
      description: "Piedra del Poder",
      done: false
    },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter(todo => todo.done === true).length;
  }

  get pendingTodos(): number {
    return this.todos.filter(todo => todo.done === false).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined) {
      return this.todos.filter(todo => todo.done === statusArgs.status);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) throw new NotFoundException("Todo not found");

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const { description } = createTodoInput;
    const todoToCreate = new Todo();
    todoToCreate.id = this.generateNewId();
    todoToCreate.description = description;

    this.todos.push(todoToCreate);

    return todoToCreate;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) {
      todoToUpdate.description = description;
    }
    if (done !== undefined) {
      todoToUpdate.done = done;
    }

    this.todos = this.todos.map(todo => (todo.id === id) ? todoToUpdate : todo);

    return todoToUpdate;
  }

  remove(id: number) {
    const todoToRemove = this.findOne(id);

    this.todos = this.todos.filter(todo => todo.id !== todoToRemove.id);

    return todoToRemove;
  }

  private generateNewId(): number {
    return Math.max(...this.todos.map(todo => todo.id), 0) + 1;
  }

}
