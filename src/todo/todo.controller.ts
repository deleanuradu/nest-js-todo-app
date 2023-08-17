import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { toPromise } from '@shared/utils';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todo.create.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<any> {
    const todos = await this.todoService.getAllTodo();
    return toPromise({ todos });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async update(@Body() todoDto: TodoDto): Promise<TodoDto> {
    return await this.todoService.updateTodo(todoDto);
  }

  // @Delete(':id')
  // async destory(@Param('id') id: string): Promise<TodoDto> {
  //   return await this.todoService.destoryTodo(id);
  // }
}
