import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    try {
      const conn = await mongoose.connect(process.env.MONGO_DB_URI);

      console.log(`MongoDB Connected: ${conn.connection.host}`);

      return conn.connection.asPromise();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};
