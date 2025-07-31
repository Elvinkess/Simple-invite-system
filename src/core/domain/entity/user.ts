import { baseEntity } from "./base_entity";
export enum UserRole {
    Estate_MANAGER = 'estate manager',
    HOMEOWNER = 'home owner',
    TENANT = 'tenant',
  }
  
export class user extends baseEntity{
    constructor(id: string,public role:UserRole, public email:string, public password:string, public estateId:string,public houseId?:string,public flatId?:string ){
        super(id);
    }
    assignAppartment(houseId: string, flatId?: string): void {
      this.houseId = houseId;
      this.flatId = flatId;
   }
  }   