import { InviteRole } from "../../invite";

export interface invitereq{
    email: string, 
    role: InviteRole,
     estateId: string
}