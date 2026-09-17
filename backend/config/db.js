const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/homecook';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB (${uri}): ${error.message}`);
    if (uri !== 'mongodb://127.0.0.1:27017/homecook') {
      try {
        console.log('Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/homecook)...');
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/homecook');
        console.log(`Connected to local MongoDB: ${conn.connection.host}`);
        return conn;
      } catch (localErr) {
        console.error(`Local MongoDB connection failed: ${localErr.message}`);
      }
    }
    process.exit(1);
  }
};

module.exports = connectDB;