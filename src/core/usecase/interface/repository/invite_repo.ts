import { Invite } from "../../../domain/entity/invite";
import { InviteDoc } from "../../../infrastruture/data_base/model/inviteSchema";
import { IBaseRepository } from "./base_repo";

export interface IInviteRepo extends IBaseRepository<Invite,InviteDoc>{}