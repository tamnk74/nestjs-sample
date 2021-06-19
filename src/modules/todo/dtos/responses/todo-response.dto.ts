import { TodoEntity } from 'modules/todo/entities';
export class TodoResponse {
  id: number;
  name: string;
  status: number;

  constructor(source: TodoEntity) {
    this.id = source.id ?? 0;
    this.name = source.name ?? '';
    this.status = source.status ?? 0;
  }
}
