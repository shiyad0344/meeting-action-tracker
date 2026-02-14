import dotenv from 'dotenv'
dotenv.config({path:'./.env'});
import { Transcript } from "../model/transcript.model.js";
import { Action } from "../model/action.model.js";
import { CohereClient } from "cohere-ai";


const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

 export const extractItems= async (req,res) => {
    try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript required" });
    }

    const savedTranscript = await Transcript.create({
      content: transcript,
    });


    const prompt = `
You are an assistant that extracts structured action items from meeting transcripts.

Return STRICT JSON array format only.

Each object must contain:
- task (string)
- owner (string or null)
- dueDate (ISO date format YYYY-MM-DD or null)

Transcript:
"""
${transcript}
"""
`;


    const response = await cohere.chat({
      model: 'command-r-08-2024', 
      message: prompt,
      temperature: 0.2,
    });
    
    // console.log("Raw response from Cohere:", response.text);

    const raw = response.text;

    const cleaned = raw.replace(/```json\s*/g, "").replace(/```/g, "").trim();

    let extracted;

    try {
      extracted = JSON.parse(cleaned);
     
        // console.log("Extracted action items:", extracted);

    } catch (err) {
      console.error("Invalid JSON from Cohere:", response.text);
      return res.status(500).json({
        error: "Model returned invalid JSON",
        raw: response.text,
      });
    }

    const tasks = await Action.insertMany(
      extracted.map((item) => ({
        task: item.task,
        owner: item.owner,
        dueDate: item.dueDate || null,
        transcriptId: savedTranscript._id,
      }))
    );

    res.json(tasks);

  } catch (error) {
    console.error("Extraction error:", error);
    res.status(500).json({ error: "Extraction failed" });
  }
}
