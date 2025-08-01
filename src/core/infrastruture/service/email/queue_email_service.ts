// infrastructure/email/QueuedEmailService.ts
import { IEmailService } from '../../../usecase/interface/service/email_service';
import { BullEmailQueue } from './bull_email_queue';

export class QueuedEmailService implements IEmailService {
  constructor(private emailQueue: BullEmailQueue) {}

  sendInvite =async(email: string, token: string): Promise<boolean>=> {
    let link = `https://localhost:${process.env.port}/users/register?token=${token}`;
    let subject = 'ESTATE SYNC INVITATION';
    let html = `
      <p>You HAVE BEEN INVITED BY YOUR ESTATE MANAGER.</p>
      <p><a href="${link}">Click here</a> to accept the invitation.</p>
      <p>Ignore this email if you didn't request it.</p>
    `;

    try {
      await this.emailQueue.addEmail(email, subject, html);
      return true;
    } catch (error) {
      console.error('Error adding email to queue:', error);
      return false;
    }
  }
}
