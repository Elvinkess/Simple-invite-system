import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export class MongoDB {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log(' MongoDB is Connected');
    } catch (err) {
      console.error(' DB connection failed', err);
      process.exit(1);
    }
  }
}