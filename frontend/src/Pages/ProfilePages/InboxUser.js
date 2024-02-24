import React from "react";
import "../styles/ProfilePage/InboxUser.css";

const InboxUser = () => {
  const chats = [
    { id: 1, name: "John Doe", message: "Hello there!", time: "12:30 PM" },
    { id: 2, name: "Jane Smith", message: "How are you?", time: "1:45 PM" },
  ];

  return (
    <div className="inbox-container">
      <div className="headingh2">
        <h2>Inbox</h2>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-item">
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-message">{chat.message}</div>
            </div>
            <div className="chat-time">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxUser;
