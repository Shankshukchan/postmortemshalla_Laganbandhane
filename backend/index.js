const express=require('express');
const app=express();
const DbConnect=require('./Config/dbConfig');
const router=require('./Router/router');
require('dotenv').config();
app.use(express.json());
DbConnect();
app.use('/api',router);// http://localhost:8000/api
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server is running on port 8000");
})