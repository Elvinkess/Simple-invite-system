import { user } from '../../../domain/entity/user';
import { UserDoc } from '../../../infrastruture/data_base/model/userSchema';
import { IBaseRepository } from './base_repo';
export interface IUserRepo extends IBaseRepository<user,UserDoc>{}