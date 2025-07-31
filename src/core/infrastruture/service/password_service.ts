import { IPasswordService } from "../../usecase/interface/service/password_service";
import bcrypt from 'bcrypt';

 export class PasswordService implements IPasswordService{
     hash = async (password: string, saltRounds: number): Promise<string> => {
            return await bcrypt.hash(password, saltRounds);
     }

     compare =async (password: string, hashPassword: string): Promise<boolean>=> {
        return await bcrypt.compare(password, hashPassword); 
    }
     

 }