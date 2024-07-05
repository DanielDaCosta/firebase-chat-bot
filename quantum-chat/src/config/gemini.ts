import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_KEY
if (!apiKey) {
    throw new Error('Google Generative AI API key is not defined.');
}
const genAI = new GoogleGenerativeAI(apiKey);

async function runChat(prompt: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

export default runChat;