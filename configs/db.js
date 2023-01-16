const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL,()=>{
        console.log("MongoDB Connected")
    });
}

module.exports=connectDB