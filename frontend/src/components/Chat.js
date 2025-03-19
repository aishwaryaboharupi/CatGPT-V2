import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/meow", { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching meows:", error);
      setResponse("⚠️ Error: Could not connect to the cat 😿");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🐱 CatGPT Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Talk to the cat..."
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
          Meow! 🐱
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>CatGPT:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default Chat;
