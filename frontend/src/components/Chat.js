import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css"; // Ensure this file exists

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const chatWindowRef = useRef(null); // ✅ Reference for auto-scroll

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput(""); // ✅ Clears input immediately for better UX

    try {
      const response = await fetch("http://127.0.0.1:5000/meow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong.", sender: "bot" },
      ]);
    }
  };

  // ✅ Pressing Enter sends the message
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // ✅ Auto-scrolls to the latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <button onClick={() => setHistoryOpen(!historyOpen)} className="toggle-btn">
          ☰
        </button>
        <h2>🐱 CatGPT Chat</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-dark">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className={`chat-history ${historyOpen ? "show" : "hide"}`}>
        <h3>Chat History</h3>
        {messages
          .filter((msg) => msg.sender === "user")
          .map((msg, i) => (
            <p key={i}>{msg.text}</p>
          ))}
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // ✅ Updated for better Enter handling
          placeholder="Talk to the cat..."
        />
        <button onClick={sendMessage}>Meow!</button>
      </div>
    </div>
  );
};

export default Chat;
