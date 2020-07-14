import User from '../infra/typeorm/entities/User';

import ICreateUsesDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUsesDTO): Promise<User>;
  save(user: User): Promise<User>;
}
