import mongoose from 'mongoose';

const configMongoDB = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));
};

export default configMongoDB;