import React, { useState } from "react";
import "../styles/Chat.css"; // Make sure you have this file for styling

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(true); // Toggle history

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = { text: generateMeow(), sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    setInput("");
  };

  const generateMeow = () => {
    const variations = ["Meow!", "Meeeooow~", "MRRREOW!", "Mroww~", "Meeow~"];
    return variations[Math.floor(Math.random() * variations.length)];
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <button onClick={() => setShowHistory(!showHistory)}>☰</button>
        <h2>🐱 CatGPT Chat</h2>
        <button onClick={() => setDarkMode(!darkMode)}>🌙</button>
      </div>

      {/* Chat History Panel */}
      <div className={`chat-history ${showHistory ? "show" : "hide"}`}>
        {messages.map((msg, index) =>
          msg.sender === "user" ? (
            <p key={index} className="history-item">{msg.text}</p>
          ) : null
        )}
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to the cat..."
        />
        <button onClick={sendMessage}>Meow! 🐱</button>
      </div>
    </div>
  );
};

export default Chat;
