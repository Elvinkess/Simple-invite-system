import crypto from 'crypto';
import { Invite, InviteRole } from '../../domain/entity/invite';
import { IInviteRepo } from '../interface/repository/invite_repo';
import { IUserRepo } from '../interface/repository/user_repo';
import { IPasswordService } from '../interface/service/password_service';
import { user, UserRole } from '../../domain/entity/user';
import { IEmailService } from '../interface/service/email_service';
import { IInviteLogic } from '../interface/logic/invite_logic_interface';

export class InviteLogic implements IInviteLogic {
  constructor(
    private inviteRepo: IInviteRepo,
    private userRepo: IUserRepo,
    private emailService: IEmailService,
    private passwordService: IPasswordService
  ) {}

  // Invite user
  invite = async(email: string, role: InviteRole, estateId: string): Promise<Invite> =>{
    let token = crypto.randomBytes(32).toString('hex');
    let expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    let invite = new Invite("",email, role,token, expiresAt, estateId); // "" :to inialize id before saving,mongoose will automaticall add an id on save
    let savedinvite =await this.inviteRepo.create(invite);
    await this.emailService.sendInvite(email, token);
    return savedinvite
  }

  //  Register user with token
  register = async(email: string, password: string, token: string): Promise<user>=> {
    let invite = await this.inviteRepo.findOne({token:token});
    if (!invite ) {throw new Error(' invalid invite')}
    if ( invite.expiresAt < new Date()) {throw new Error(' expired invite')}

    let hashedPassword = await this.passwordService.hash(password,10);

    let newUser = new user("",invite.role as UserRole,email,hashedPassword,invite.estateId);

    let saveduser= await this.userRepo.create(newUser);
    await this.inviteRepo._update(invite.id,{token:""});
    return saveduser
  }

 
}
