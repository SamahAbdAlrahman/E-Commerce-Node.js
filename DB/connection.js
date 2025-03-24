import mongoose from 'mongoose';

const uri = 'mongodb+srv://S11941150:QOOi2Fw5npvKLdQz@cluster0.q6vmo.mongodb.net/e_commerce_db?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};
connectDB();

export default connectDB;