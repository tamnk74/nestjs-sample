import { IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities';

export class PostRequest {
  id?: number;

  slug?: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  status?: number;

  author?: UserEntity;
}
