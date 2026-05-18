import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial greeting message
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your AI Tea Sommelier 🍵. Need help finding the perfect blend?" }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI immediately
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call your new Express backend route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await res.json();

      // Add AI response to UI
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-2xl w-80 h-96 flex flex-col mb-4 overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 font-bold flex justify-between items-center">
            <span>✨ AI Tea Sommelier</span>
            <button onClick={toggleChat} className="text-xl hover:text-gray-200">&times;</button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={index} className={`max-w-[85%] p-2 rounded-lg text-sm ${
                msg.sender === "user" 
                  ? "bg-green-600 text-white self-end rounded-br-none" 
                  : "bg-gray-200 text-black self-start rounded-bl-none"
              }`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="text-gray-400 text-xs self-start italic">Steeping a response...</div>}
          </div>

          {/* Input Box */}
          <form onSubmit={sendMessage} className="p-2 border-t bg-white flex">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our teas..."
              className="flex-1 border rounded-l-md p-2 outline-none text-black text-sm"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-md transition">
              Send
            </button>
          </form>
        </div>
      )}
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat} 
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition font-bold flex items-center gap-2"
        >
          💬 Ask an Expert
        </button>
      )}
    </div>
  );
};

export default Chatbot;