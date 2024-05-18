import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOURI}/WEB_COMPILER_JS`)
        console.log(`MONGODB CONNECTED!!!` , connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
    }
}