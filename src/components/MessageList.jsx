import Message from "./Message";

export default function MessageList({ messages, currentUser }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message
          key={index}
          content={msg.content}
          isSender={msg.from === currentUser}
          type={msg.msgType || "text"}
        />
      ))}
    </div>
  );
}
