import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { todos } from 'src/mock/todos.mock';
import { toPromise } from '../shared/utils';
import { toTodoDto } from '../shared/mapper';
import { TodoCreateDto } from './dto/todo.create.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    return this.todos.map((todo) => toTodoDto(todo));
  }

  getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuid(),
      name,
      description,
    };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));
  }

  async updateTodo(todoDto: TodoDto): Promise<TodoDto> {
    const { id, name, description } = todoDto;

    const updatedTodo: TodoEntity = {
      id,
      name,
      description,
    };

    this.todos.forEach((todo, index) => {
      if (todo.id === id) {
        this.todos[index] = updatedTodo;
      }
    });

    return toPromise(toTodoDto(updatedTodo));
  }
}
