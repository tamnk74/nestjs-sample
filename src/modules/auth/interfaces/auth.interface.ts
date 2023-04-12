import { UserEntity } from '@/modules/users/entities';

export type AuthPayload = Omit<UserEntity, 'password'>;
