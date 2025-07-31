import { Invite, InviteRole } from "../../domain/entity/invite";
import { IInviteRepo } from "../../usecase/interface/repository/invite_repo";
import { InviteDoc, InviteModel } from "../data_base/model/inviteSchema";
import { BaseRepository } from "./base_repo";

export class InviteRepository extends BaseRepository<Invite, InviteDoc > implements IInviteRepo {
    constructor() {
      super(InviteModel);
    }
    protected toDomain(doc: InviteDoc): Invite {
        return new Invite(
          doc._id.toString(), 
          doc.email,
          doc.role as InviteRole, 
          doc.token,
          doc.expiresAt,
          doc.estateId.toString()  ,
          doc.flatId?.toString()  
        );
      }
  }
