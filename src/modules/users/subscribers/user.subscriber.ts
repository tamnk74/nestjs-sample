import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { UserEntity } from '../entities';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}
