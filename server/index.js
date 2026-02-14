import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import app from './app.js'
import { dbConnect } from './DB/db.js';



dbConnect()

app.listen(process.env.PORT||5000,()=>{
console.log("server started")
})

