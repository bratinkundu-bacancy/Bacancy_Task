const mongoose = require("mongoose");

const url = "mongodb+srv://admin:admin@cluster0.bqmwr.mongodb.net/test?retryWrites=true&w=majority"
module.exports = async (db) => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!')
    return conn;
  } catch (err) {
    throw new Error('MongoDB connection err: ' + err);
  }
};