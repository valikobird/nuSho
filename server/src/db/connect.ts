import mongoose from 'mongoose';

const connectDb = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;
