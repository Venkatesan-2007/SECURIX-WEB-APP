import React, { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);
  const API_URL = "http://localhost:5000/api/chat";

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ text: "Hello! I'm Securix's AI Assistant powered by Gemini. How can I help you with our services?", sender: "bot" }]);
    }
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  function toggle() {
    setOpen(prev => !prev);
  }

  async function send() {
    const text = input.trim();
    if (!text) return;
    
    const userMsg = { text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "I couldn't process your request. Please try again.";
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = "Sorry, I'm having trouble connecting to the AI service. Please check if the backend server is running on port 5000.";
      setMessages(prev => [...prev, { text: errorMsg, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div id="chatBox" className={open ? "open" : ""}>
        <div id="messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <p key={i} className={m.sender === "user" ? "user" : "bot"}>{m.text}</p>
          ))}
          {loading && <p className="bot">⏳ Thinking...</p>}
        </div>
        <input
          id="chatInput"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !loading) send(); }}
          placeholder="Type message..."
          disabled={loading}
        />
      </div>

      <button id="chatToggle" onClick={toggle}>{open ? "Close Chat" : "Chat"}</button>

      <a className="floating-whatsapp" href="https://wa.me/917010000000?text=Hello%20Securix%20Service" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp"/>
      </a>
    </>
  );
}
