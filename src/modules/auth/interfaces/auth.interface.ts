import { UserEntity } from 'src/modules/users/entities';

export type AuthPayload = Omit<UserEntity, 'password'>;
