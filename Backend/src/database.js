import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    })
}

export default connectDB;
