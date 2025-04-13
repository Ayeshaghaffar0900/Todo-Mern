const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ayeshaaghaffar07:ayesha2007@cluster0.m32gt.mongodb.net/c', {
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};


module.exports = connectDB;