import { UserEntity } from '@/modules/users/entities';
import { IsString } from 'class-validator';

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
