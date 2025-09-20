import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const matches = [
  { id: 1, name: "Alice", image: "https://randomuser.me/api/portraits/women/1.jpg", age: 24, bio: "Love hiking and music." },
  { id: 2, name: "Bob", image: "https://randomuser.me/api/portraits/men/2.jpg", age: 26, bio: "Tech enthusiast and foodie." },
  { id: 3, name: "Clara", image: "https://randomuser.me/api/portraits/women/3.jpg", age: 22, bio: "Travel, books, and coffee lover." },
];

const Chat = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(matches[0]);
  const [messages, setMessages] = useState([
    { sender: "them", text: "Hey! How are you?" },
    { sender: "me", text: "Hi! I'm good, you?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages(prev => [...prev, { sender: "me", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "them", text: "Cool! 😄" }]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  return (
    <div className="chat-container">
      {/* Sidebar with matches */}
      <div className="sidebar">
        <h3>Matches</h3>
        {matches.map(user => (
          <div
            key={user.id}
            className={`match ${selectedUser.id === user.id ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.image}
              alt={user.name}
              onClick={() => navigate("/profile", { state: user })}
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Chat box */}
      <div className="chat-box">
        <div className="chat-header">
          <img
            src={selectedUser.image}
            alt={selectedUser.name}
            onClick={() => navigate("/profile", { state: selectedUser })}
          />
          <div className="chat-header-info">
            <h3>{selectedUser.name}, {selectedUser.age}</h3>
            <p>{selectedUser.bio}</p>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "me" ? "me" : "them"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
