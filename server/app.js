import express from 'express'
import cors from 'cors'

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
 }));

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));


import extractRoute from './routes/extract.route.js';
app.use("/api/extract",extractRoute)
// app.get("/",(req,res)=>{
//     res.send("Hello from server")
// })

import crudtaskRoute from './routes/CRUDtask.route.js'
app.use("/api/tasks",crudtaskRoute)

export default app;