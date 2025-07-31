import { baseEntity } from "./base_entity";

export type InviteRole =  'home owner' | 'tenant';

export class Invite extends baseEntity{
    constructor(id: string,public email:string, public role:InviteRole, public token:string, public expiresAt:Date,public estateId:string,public flatId?:string){
        super(id);
    }
   }


