import { Schema, model, Document, Types } from 'mongoose';
import { UserRole } from '../../../domain/entity/user';

//Interface describing the shape of the Mongoose document

export interface UserProps {
  email: string;
  password: string;
  role: UserRole;
  estateId: Types.ObjectId;
  houseId?: Types.ObjectId;
  flatId?: Types.ObjectId;
}

// Now define the Mongoose document type
export interface UserDoc extends UserProps, Document {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['estate manager', 'home owner', 'tenant'], required: true },
    estateId: { type: Schema.Types.ObjectId, required: true, ref: 'Estate' },
    houseId: { type: Schema.Types.ObjectId, ref: 'House' },
    flatId: { type: Schema.Types.ObjectId, ref: 'Flat' },
  },
);

// Create and export the model
const UserModel = model<UserDoc>('User', UserSchema);

export default UserModel;



