import { Injectable, Scope } from '@nestjs/common';
import { getCustomRepository, ObjectType, Repository } from 'typeorm';
import { UnitOfWork } from '.';
import { BaseRepository } from './base.repository';

@Injectable({ scope: Scope.REQUEST })
export class TransactionalRepository {
  constructor(private uow: UnitOfWork) {}
  /**
   * Gets a repository bound to the current transaction manager
   * or defaults to the current connection's call to getRepository().
   */
  getRepository<Entity>(
    repository: ObjectType<Repository<Entity>>,
  ): BaseRepository<Entity> {
    const transactionManager = this.uow.getTransactionManager();
    if (transactionManager) {
      return transactionManager.getCustomRepository(
        repository,
      ) as BaseRepository<Entity>;
    }
    return getCustomRepository(repository) as BaseRepository<Entity>;
  }
}
