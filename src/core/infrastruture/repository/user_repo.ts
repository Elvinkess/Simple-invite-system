
import { user, UserRole } from '../../domain/entity/user';
import { BaseRepository } from './base_repo';
import UserModel, { UserDoc } from '../data_base/model/userSchema';
import { IUserRepo } from '../../usecase/interface/repository/user_repo';


export class UserRepository extends BaseRepository<user, UserDoc> implements IUserRepo {
  constructor() {
    super(UserModel);
  }

  protected toDomain(doc: UserDoc): user {
    return new user(
      doc._id.toString(),  
      doc.role as UserRole,                 
      doc.email,
      doc.password,
      doc.estateId.toString(),
      doc.houseId?.toString(),
      doc.flatId?.toString()
    );
  }
}
