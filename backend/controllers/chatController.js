import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/productModel.js"; 

const generateChatResponse = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const { message } = req.body;

    // 1. Fetch General Inventory 
    const products = await Product.find({}).select("name price countInStock").limit(20);
    const inventoryList = products.map(p => `- ${p.name}: $${p.price} (${p.countInStock} in stock)`).join("\n");

    // 2. Fetch Newest Arrivals 
    // Sorts by creation date descending (-1) and grabs the top 3
    const newProducts = await Product.find({}).sort({ createdAt: -1 }).limit(3).select("name price");
    const newArrivalsList = newProducts.map(p => `- ${p.name}: $${p.price}`).join("\n");

    // 3. Fetch Top Rated / Best Sellers
    // Adjust the sort field depending on your schema (e.g., if you have a 'sold' field, use { sold: -1 })
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3).select("name price rating");
    const topSellersList = topProducts.map(p => `- ${p.name}: $${p.price} (${p.rating} stars)`).join("\n");
    
    // 4. Inject labeled sections into the System Prompt
    const prompt = `
      You are a master tea sommelier exclusively serving our Green Tea e-commerce store. 
      Keep your answers short, elegant, and helpful.
      Only answer questions related to green tea, brewing methods, flavor profiles, and our shop.

      CRITICAL STORE CONTEXT:
      Use the following live database information to answer the user accurately.

      [GENERAL INVENTORY]
      ${inventoryList}

      [NEWEST ARRIVALS] - If the user asks what is new, strictly recommend these:
      ${newArrivalsList}

      [TOP RATED / BEST SELLERS] - If the user asks for recommendations or what is popular, strictly use these:
      ${topSellersList}

      User says: "${message}"
    `;
                    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: "Our tea sommelier is currently unavailable. Please try again later!" });
  }
};

export { generateChatResponse };