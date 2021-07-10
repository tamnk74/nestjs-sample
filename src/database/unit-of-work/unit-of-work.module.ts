import { Global, Module } from '@nestjs/common';
import { UnitOfWork } from './unit-of-work';
import { TransactionalRepository } from './transactional.repository';

@Global()
@Module({
  imports: [],
  providers: [UnitOfWork, TransactionalRepository],
  exports: [UnitOfWork, TransactionalRepository],
})
export class UnitOfWorkModule {}
