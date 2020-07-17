import User from '../infra/typeorm/entities/User';

import ICreateUsesDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFandAllProvidersDTO';


export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUsesDTO): Promise<User>;
  save(user: User): Promise<User>;
}
