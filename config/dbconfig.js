import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

const db_url = process.env.DB_URI

const connectdatabase = () =>{
    mongoose.connect(db_url);
    const db = mongoose.connection;

    db.on('error',()=>{
        console.log('Error encountered while connecting to database.');
    })
    db.once('open',()=>{
        console.log('Succesfully connected to the database.');
    })
}

export default connectdatabase
