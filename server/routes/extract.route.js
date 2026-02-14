
import express from "express";
import { extractItems } from '../controller/extract.controller.js';


const router=express.Router();

router.post("/",extractItems);

export default router;





