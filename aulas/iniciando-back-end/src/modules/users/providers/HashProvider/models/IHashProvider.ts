import { StorageEngine } from 'multer';

export default interface IHshProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
