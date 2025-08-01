import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { BullEmailQueue } from './bull_email_queue';

dotenv.config();

const bullEmailQueue = new BullEmailQueue();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

bullEmailQueue.queue.process(async (job) => {
  const { to, subject, html } = job.data;

  try {
    await transporter.sendMail({
      from: `"ESTATE SYNC" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent to', to);
  } catch (error) {
    console.error('Failed to send email to', to, error);
  }
});
