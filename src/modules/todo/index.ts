import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers';
import { TodoRepository } from './repositories';
import { TodoService } from './services';
import { AuthModule } from 'modules/auth';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
