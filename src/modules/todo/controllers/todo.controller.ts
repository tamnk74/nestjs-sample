import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  ParseIntPipe,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from '../services';
import { TodoEntity } from '../entities';
import { TodoRequest, TodoResponse } from '../dtos';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('/')
  async createTodo(@Body() todoRequest: TodoRequest): Promise<InsertResult> {
    const todo = await this.todoService.create(todoRequest);
    return todo;
  }

  @Get('/')
  async getTodos(): Promise<TodoResponse[] | undefined> {
    const todos = await this.todoService.get();
    const result = todos?.map((todo: TodoEntity) => {
      return new TodoResponse(todo);
    });
    return result;
  }

  @Get('/:id')
  async getTodoById(@Param() id: number): Promise<TodoResponse> {
    const todo = await this.todoService.getById(id);
    if (!todo) {
      throw new NotFoundException('NOT FOUND');
    }
    return new TodoResponse(todo);
  }

  @Put('/:id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: TodoRequest,
  ): Promise<TodoEntity> {
    request.id = id;
    return await this.todoService.update(request);
  }

  @Patch('/:id')
  async updateFieldTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: Partial<TodoRequest>,
  ): Promise<TodoEntity> {
    request.id = id;
    return await this.todoService.updateField(request);
  }

  @Delete('/:id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.todoService.delete(id);
  }
}
