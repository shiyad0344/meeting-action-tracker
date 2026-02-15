import express from 'express'
import cors from 'cors'

const app=express();

app.use(cors({
    origin: "https://shiyad0344-meeting-action-tracker-f.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
 }));

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));

app.get("/", (req, res) => {
  res.json({ message: "Backend is running " });
});


import extractRoute from './routes/extract.route.js';
app.use("/api/extract",extractRoute)
// app.get("/",(req,res)=>{
//     res.send("Hello from server")
// })

import crudtaskRoute from './routes/CRUDtask.route.js'
app.use("/api/tasks",crudtaskRoute)

import statusRoute from './routes/status.route.js'
app.use("/api",statusRoute)

export default app;