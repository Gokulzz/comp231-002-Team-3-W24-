// src/db/conn.mjs
import mongoose from "mongoose";

//  const uri = "mongodb+srv://gokulkhatri:Gokul123%21%40%23@cluster0.agpzzga.mongodb.net/?retryWrites=true&w=majority";



const connectToMongoDB = () => {

    mongoose.connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT" 
    })
    .then(()=> {
      console.log("Connected to Database!")
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to db: ${err}`);
    })
  }

export default connectToMongoDB;
