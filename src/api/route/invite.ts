import { Router } from 'express';
import { inviteController } from '../programs';
import { Validator } from '../middlewares/field_validator';


const inviteRouter = Router();
const validator = new Validator()

inviteRouter.post('/invite',validator.signValidation,validator.validate ,inviteController.invite);
inviteRouter.post('/register/:token', inviteController.register);
export default inviteRouter;