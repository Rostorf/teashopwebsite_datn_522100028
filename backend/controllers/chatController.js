import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("My API Key is:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Using the Gemini 1.5 Flash model for fast chat responses
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // System Prompt: This tells the AI HOW to act before it answers the user
    const prompt = `
      You are a friendly, elegant, and knowledgeable AI Tea Sommelier for our online tea shop. 
      Keep your answers short (2-3 sentences max).
      Only answer questions related to tea, brewing methods, flavor profiles, and our shop.
      If a user asks something unrelated, politely steer them back to tea.
      User says: "${message}"
    `;
                    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: "Sorry, my tea leaves are cloudy today. Try again later!" });
  }
};

export { generateChatResponse };