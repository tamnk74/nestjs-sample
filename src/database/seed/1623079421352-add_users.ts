import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class addUsers1623079421352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin123', salt);
    await queryRunner.query(
      'INSERT INTO users(email, password) VALUES ($1, $2)',
      ['admin@mailinator.com', hash],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE from users');
  }
}
