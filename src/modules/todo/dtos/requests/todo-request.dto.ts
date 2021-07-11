import { IsString, IsNumber } from 'class-validator';

export class TodoRequest {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  status: number;

  constructor(
    id: number | undefined,
    name: string,
    status: number | undefined,
  ) {
    this.id = id ?? 0;
    this.name = name;
    this.status = status ?? 0;
  }
}
