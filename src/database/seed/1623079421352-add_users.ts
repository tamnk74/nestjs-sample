import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsers1623079421352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO users(email, password) VALUES ($1, $2)',
      ['admin@mailinator.com', 'Admin123'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE from users');
  }
}
