import React, { useState } from "react";
import "../styles/Chat.css"; // Ensure this file exists

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/meow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setMessages([...messages, newMessage, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  // ✅ **NEW: Add Enter Key Support**
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents accidental form submission
      sendMessage();
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <button onClick={() => setHistoryOpen(!historyOpen)}>☰</button>
        <h2>🐱 CatGPT Chat</h2>
        <button onClick={() => setDarkMode(!darkMode)}>🌙</button>
      </div>

      <div className={`chat-history ${historyOpen ? "show" : "hide"}`}>
        {messages.map((msg, i) =>
          msg.sender === "user" ? <p key={i}>{msg.text}</p> : null
        )}
      </div>

      <div className="chat-window">
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
          onKeyPress={handleKeyPress} // ✅ NEW: Press Enter to send message
          placeholder="Talk to the cat..."
        />
        <button onClick={sendMessage}>Meow!</button>
      </div>
    </div>
  );
};

export default Chat;
