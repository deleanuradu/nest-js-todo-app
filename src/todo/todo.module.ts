import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TaskEntity } from '@todo/entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, TaskEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
