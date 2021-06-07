import bcryptjs from 'bcryptjs';

export class UtilsService {
  static generateHash(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }

  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash || '');
  }

  static generateRandomInteger(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toUpperCase()
      .substr(0, length);
  }
}
