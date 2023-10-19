// const express = require('express')
// Lets use type:'module' in package.json

import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv()

// middleware setup
app.use(express.json());
app.use(cookieParser());

// dbconnection perform here
import connectdatabase from "./config/dbconfig.js";
connectdatabase();

// Setting router
import userrouter from "./router/user.router.js";
app.use('/api',userrouter)

// basic responses
app.get('/',(req,res)=>{
    console.log("welcome to Learning Managment System");
})

export default app;