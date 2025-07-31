export interface IEmailService {
    sendInvite(email: string, token: string): Promise<boolean>;
  }
  