import { Invite, InviteRole } from "../../../domain/entity/invite";
import { user } from "../../../domain/entity/user";

export interface IInviteLogic{
  invite (email: string, role: InviteRole, estateId: string): Promise<Invite> 
  register (email: string, password: string, token: string): Promise<user>

}