import { InviteRepository } from "../core/infrastruture/repository/invite_repo";
import { UserRepository } from "../core/infrastruture/repository/user_repo";
import { BullEmailQueue } from "../core/infrastruture/service/email/bull_email_queue";
import { QueuedEmailService } from "../core/infrastruture/service/email/queue_email_service";
import { PasswordService } from "../core/infrastruture/service/password_service";
import { IInviteLogic } from "../core/usecase/interface/logic/invite_logic_interface";
import { IInviteRepo } from "../core/usecase/interface/repository/invite_repo";
import { IUserRepo } from "../core/usecase/interface/repository/user_repo";
import { IEmailService } from "../core/usecase/interface/service/email_service";
import { IPasswordService } from "../core/usecase/interface/service/password_service";
import { InviteLogic } from "../core/usecase/logic/invite_user_logic_implementation";
import { InviteController } from "./controllers/invite_controller";


const emailQueue = new BullEmailQueue();
let inviteRepo:IInviteRepo = new InviteRepository()
let userrepo:IUserRepo = new UserRepository()
const emailService = new QueuedEmailService(emailQueue);

let paswordService:IPasswordService = new PasswordService()

const inviteLogic:IInviteLogic = new InviteLogic(inviteRepo,userrepo,emailService,paswordService);

export const inviteController = new InviteController(inviteLogic);
