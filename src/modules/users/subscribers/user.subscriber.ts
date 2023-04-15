import * as bcryptjs from 'bcryptjs';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { UserEntity } from '../entities';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
    if (event.entity.password) {
      const salt = bcryptjs.genSaltSync(10);
      event.entity.password = bcryptjs.hashSync(event.entity.password, salt);
    }
  }
}
