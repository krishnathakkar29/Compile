import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGOURI}/WD_Compiler`)
        console.log("Connection established")
    } catch (error) {
        console.log(`Error connecting to MONGODB!!! `, error)
    }
}