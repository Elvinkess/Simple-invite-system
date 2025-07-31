import  { Request,Response,NextFunction } from "express"
import { invitereq } from "../../core/domain/entity/dto/request/invite_request"
import { IInviteLogic } from "../../core/usecase/interface/logic/invite_logic_interface";

export class InviteController{
    constructor(private inviteLogic:IInviteLogic){}
    invite =  async(req : Request<{}, {},invitereq >, res: Response, next: NextFunction)=>{
        try {
            let invite = await this.inviteLogic.invite(req.body.email,req.body.role,req.body.estateId);
            res.json(invite);
            
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }

    register =  async(req : Request<{token:string}, {},{email: string, password: string,} >, res: Response, next: NextFunction)=>{
        try {
           let {email, password}  = req.body
            let invite = await this.inviteLogic.register(email,password,req.params.token);
            res.json(invite);
            
        } catch (err) {
            res.json({error: (err as Error).message})
        }
    }
  

}