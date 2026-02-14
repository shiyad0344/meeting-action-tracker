import express from "express";
import mongoose from "mongoose";
import { CohereClient } from "cohere-ai";


const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const router=express.Router();

router.get("/status", async (req, res) => {
  try {
    const dbState =await mongoose.connection.readyState === 1;

    let llmStatus = false;
    try {
      await cohere.chat({
        model: "command-r-08-2024",
        message: "hello",
        maxTokens: 5
      });
      llmStatus = true;
    } catch (err) {
      llmStatus = false;
    }

    res.json({
      backend: true,
      database: dbState,
      llm: llmStatus
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
