import { Schema, model, Document, Types } from 'mongoose';
import { InviteRole } from '../../../domain/entity/invite';

export interface InviteDoc extends Document {
  _id: Types.ObjectId; 
  email: string;
  role: InviteRole;
  token: string;
  expiresAt: Date;
  estateId: Types.ObjectId;  
  flatId?:Types.ObjectId;  
}

const InviteTokenSchema = new Schema<InviteDoc>({
  email: { type: String, required: true },
  role: { type: String, enum: ['home owner', 'tenant'], required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  estateId: { type: Schema.Types.ObjectId, ref: 'Estate' },
  flatId: { type: Schema.Types.ObjectId, ref: 'Flat' },
});

export const InviteModel = model<InviteDoc>('InviteToken', InviteTokenSchema);
