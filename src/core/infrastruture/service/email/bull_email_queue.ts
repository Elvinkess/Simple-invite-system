import Queue from 'bull';

export class BullEmailQueue {
  public queue: Queue.Queue;

  constructor() {
    this.queue = new Queue('emailQueue', {
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });
  }

  async addEmail(to: string, subject: string, html: string) {
    await this.queue.add({ to, subject, html });
  }
}
