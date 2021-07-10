import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult } from 'typeorm';
import { TodoRequest } from '../dtos';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  create(todoModel: TodoRequest): Promise<InsertResult> {
    return this.todoRepository.insert(todoModel);
  }

  get(): Promise<TodoEntity[] | undefined> {
    return this.todoRepository.find();
  }

  getById(id: number): Promise<TodoEntity | undefined> {
    return this.todoRepository.findOne(id);
  }

  update(todoModel: TodoRequest): Promise<TodoEntity> {
    return this.todoRepository.save({
      ...todoModel,
    });
  }

  updateField(todoModel: Partial<TodoRequest>): Promise<TodoEntity> {
    return this.todoRepository.save({
      ...todoModel,
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete({ id: id });
  }
}
