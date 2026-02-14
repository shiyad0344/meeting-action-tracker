import dotenv from 'dotenv'
dotenv.config({path:'./.env'});
// import cohere from './cohereconfig/cohere.js'
import { CohereClient } from "cohere-ai";

 

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
  console.log(process.env.COHERE_API_KEY)

async function test() {
  const response = await cohere.chat({
    model: 'command-r-08-2024',
    message: "Say hello",
  });
  console.log(response.text);
}

 const transcript = "Shivam will update API docs by Friday. Priya will deploy staging by Monday."

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

async function testExtraction() {   
 const response = await cohere.chat({
      model: 'command-r-08-2024', // Recommended model
      message: prompt,
      temperature: 0.2,
    });
    console.log("Raw response from Cohere:", response.text);
    let extracted;

    try {   
        extracted = JSON.parse(response.text);
        console.log("Extracted action items:", extracted);
    } catch (err) {
        console.error("Invalid JSON from Cohere:", response.text);
    }

}

testExtraction();   

// test();