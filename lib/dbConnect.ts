import mongoose from "mongoose";
const uri = process.env.MONGODB_URI as string;

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(uri);
    } catch (error) {
        console.log('db connection fail: ', error);
    }
    
}

export default dbConnect;