import { CohereClient } from "cohere-ai";

const cohere = new CohereClient(
    {token:process.env.COHERE_API_KEY});

    // console.log(process.env.COHERE_API_KEY)

export default cohere;
