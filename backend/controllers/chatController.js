import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/productModel.js"; 

const generateChatResponse = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const { message } = req.body;

    // 1. Fetch General Inventory 
    const products = await Product.find({}).select("name price countInStock").limit(20);
    const inventoryList = products.map(p => `- ${p.name}: $${p.price} (Còn: ${p.countInStock})`).join("\n");

    // 2. Fetch Newest Arrivals 
    const newProducts = await Product.find({}).sort({ createdAt: -1 }).limit(3).select("name price");
    const newArrivalsList = newProducts.map(p => `- ${p.name}: $${p.price}`).join("\n");

    // 3. Fetch Top Rated / Best Sellers
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3).select("name price rating");
    const topSellersList = topProducts.map(p => `- ${p.name}: $${p.price} (${p.rating} sao)`).join("\n");
    
    // 4. TIẾNG VIỆT SYSTEM PROMPT
    const prompt = `
      Bạn là một Nghệ nhân Trà đạo (Tea Sommelier) xuất sắc, phục vụ riêng cho cửa hàng Trà Xanh trực tuyến của chúng tôi. 
      Trả lời ngắn gọn, thanh lịch và hữu ích (tối đa 2-3 câu).
      Chỉ trả lời các câu hỏi liên quan đến trà xanh, phương pháp pha trà, hương vị và cửa hàng của chúng tôi.
      BẮT BUỘC: Luôn luôn trả lời bằng Tiếng Việt.

      THÔNG TIN CỬA HÀNG HIỆN TẠI (Dùng dữ liệu này để trả lời chính xác):

      [TẤT CẢ SẢN PHẨM]
      ${inventoryList}

      [HÀNG MỚI VỀ] - Nếu khách hỏi trà mới, hãy gợi ý những loại này:
      ${newArrivalsList}

      [BÁN CHẠY / ĐÁNH GIÁ CAO] - Nếu khách nhờ tư vấn hoặc hỏi trà nào ngon/phổ biến, hãy gợi ý những loại này:
      ${topSellersList}

      Khách hàng nói: "${message}"
    `;
                    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: "Chuyên gia trà đạo hiện không có mặt. Vui lòng thử lại sau!" });
  }
};

export { generateChatResponse };