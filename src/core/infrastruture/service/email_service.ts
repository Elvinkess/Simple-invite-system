import { IEmailService } from '../../usecase/interface/service/email_service';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();



export class EmailService implements IEmailService {
   transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    
    },
    connectionTimeout: 10000,
    tls: {
      rejectUnauthorized: false,
    },

    

  });

   sendInvite = async(email: string, token: string): Promise<boolean> => {
    let Link = `https://localhost:${process.env.port}/api/users/register?token=${token}`;
        try {
            await this.transporter.sendMail({
                from: `"ESTATE SYNC" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'ESTATE SYNC INVITATION',
                html: `
                  <p>You HAVE BEEN INVITED BY YOUR ESTATE MANAGER.</p>
                  <p><a href="${Link}">Click here</a></p>
                  <p>pls  ignore if you didnt request this email.</p>
                `,
              });
            return true
            }
         catch (error) {
          console.log(error)
            return false;
        }
   }
   
}
