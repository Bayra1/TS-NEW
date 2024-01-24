import mongoose from "mongoose";
export const connectDatabase = async () => {
    try {
        const MONGODB_URI = `mongodb+srv://Isvhbaatar:94849622@cluster0.02jcx1i.mongodb.net/`;
        await mongoose.connect(MONGODB_URI);
        console.log('database connected succesfully');
    } catch (error : unknown) {
        throw new Error(`Database cannot connect`)
    }
} 

