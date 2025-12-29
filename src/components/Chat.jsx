import MessageList from "./MessageList";
import "./Chat.css";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const user = sessionStorage.getItem("user");
  const avatar = sessionStorage.getItem("avatar");

  if (!user) {
    window.location.href = "/login";
  }

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatTo, setChatTo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket Server
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      // Login to server
      ws.current.send(JSON.stringify({ type: "login", username: user, avatar: avatar }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        setOnlineUsers(data.users.filter(u => u.username !== user));
      } else if (data.type === "receive_message") {
        // Only show message if it belongs to the current conversation
        // (Simplified for now: In a real app we'd store all and filter view)
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [user]);

  const handleSendMessage = () => {
    if (inputValue.trim() && chatTo) {
      const newMessage = {
        type: "message",
        from: user,
        to: chatTo,
        content: inputValue,
        msgType: "text"
      };

      // Send to server
      ws.current.send(JSON.stringify(newMessage));

      // Update local UI
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");
    } else if (!chatTo) {
      alert("Select a user to chat with!");
    }
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && handleSendMessage();
  };

  // Filter messages for the current chat
  const displayedMessages = messages.filter(
    msg => (msg.from === user && msg.to === chatTo) || (msg.from === chatTo && msg.to === user)
  );

  return (
    <div className="chat-container">
      <div className="glass-panel chat-interface">

        {/* Sidebar */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Chats</h3>
            {avatar && <img src={avatar} alt="Me" className="avatar-small" style={{ marginLeft: 'auto' }} />}
          </div>
          <div className="contact-search">
            <input
              type="text"
              placeholder="Find user..."
              className="search-input"
              style={{ width: '100%', borderRadius: '20px', border: 'none', padding: '10px' }}
            />
          </div>
          <div className="contact-list">
            <h4>Online Users</h4>
            {onlineUsers.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', opacity: 0.6 }}>No one else is online</div>
            ) : (
              onlineUsers.map(u => (
                <div
                  key={u.username}
                  className={`contact-item ${chatTo === u.username ? 'active' : ''}`}
                  onClick={() => setChatTo(u.username)}
                >
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.username} className="avatar" />
                  ) : (
                    <div className="avatar">{u.username[0].toUpperCase()}</div>
                  )}
                  <div className="contact-info">
                    <span className="contact-name">{u.username}</span>
                    <span className="contact-status">Online</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-header">
            {chatTo ? (
              <>
                {onlineUsers.find(u => u.username === chatTo)?.avatar ? (
                  <img src={onlineUsers.find(u => u.username === chatTo).avatar} alt={chatTo} className="avatar-small" />
                ) : (
                  <div className="avatar-small">{chatTo[0].toUpperCase()}</div>
                )}
                <h3>{chatTo}</h3>
              </>
            ) : (
              <h3>Select a user to start chatting</h3>
            )}
          </div>

          <div className="chat-messages-area">
            {chatTo ? (
              <MessageList messages={displayedMessages} currentUser={user} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
                <p>Select a contact from the sidebar to start messaging</p>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="message-input"
              disabled={!chatTo}
            />
            <button onClick={handleSendMessage} className="btn-send" disabled={!chatTo}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}
