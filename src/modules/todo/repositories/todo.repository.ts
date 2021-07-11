import { TodoEntity } from '../entities';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {}
