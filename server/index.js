import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import app from './app.js'
import { dbConnect } from './DB/db.js';



dbConnect()


