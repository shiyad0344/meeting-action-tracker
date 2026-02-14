import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import app from './app.js'
import { dbConnect } from './DB/db.js';



dbConnect()
console.log(process.env.COHERE_API_KEY)

app.listen(process.env.PORT||5000,()=>{
console.log("server started")
})

