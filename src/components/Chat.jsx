import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MessageList from "./MessageList";
import "./Chat.css";
import { useState } from "react";
import { loadMessages } from "../utils/loadMessages";
import { putMessage } from "../utils/putMessage";
import { jwtDecode } from "../utils/jwtDecode";
// import { putMessageOnTopic } from "../utils/messageSync";

const user = await jwtDecode(
  import.meta.env.VITE_USERPOOL_ID,
  import.meta.env.VITE_CLIENT_ID
);

console.log("Current User: " + user);

export default function Chat() {
  if (!user) {
    sessionStorage.clear();
    window.location.href = "/login";
  }
  const [messages, setMessages] = useState([]);
  const [chatTo, setChatTo] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        content: inputValue,
        from: user, // Assuming "user" is the current user
        to: chatTo,
      };
      putMessage(newMessage);
      // putMessageOnTopic(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleChatFind = async () => {
    if (chatTo.trim()) {
      // Logic to find and start chat with the specified user
      console.log(`Starting chat with ${chatTo}`);
      setMessages(await loadMessages(user, chatTo));
    }
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && handleSendMessage();
  };

  // console.log("Access Token: " + sessionStorage.getItem("accessToken"));
  // console.log("ID Token: " + sessionStorage.getItem("idToken"));

  return (
    // <Container fluid>
    // <div className="chat-header">
    //   <h2>Chat Application</h2>
    // </div>
    //   <div className="chat-messages">
    //     <MessageList messages={messages} />
    //   </div>
    // <div className="chat-to">
    //   <input
    //     type="text"
    //     placeholder="Let's chat with..."
    //     value={chatTo}
    //     onChange={(e) => setChatTo(e.target.value)}
    //   />
    //   <button onClick={handleChatFind}>Let Chat!</button>
    // </div>
    // <div className="chat-input">
    //   <input
    //     type="text"
    //     placeholder="Type a message..."
    //     value={inputValue}
    //     onChange={(e) => setInputValue(e.target.value)}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <button onClick={handleSendMessage}>Send</button>
    // </div>
    // </Container>
    <Container fluid>
      <div className="chat-header">
        <h2>Chat Application</h2>
      </div>
      <Row>
        <Col md="4" className="chat-contact-div">
          <div className="chat-to">
            <input
              type="text"
              placeholder="Let's chat with..."
              value={chatTo}
              onChange={(e) => setChatTo(e.target.value)}
            />
            <button onClick={handleChatFind}>Let Chat!</button>
          </div>
        </Col>
        <Col md="6" className="chat-messages-div">
          <MessageList messages={messages} />
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
