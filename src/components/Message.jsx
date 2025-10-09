export default function Message({content, isSender}) {
  return (
    <div
      className={`message ${isSender ? "message-sender" : "message-friend"}`}
    >
      <p>{content}</p>
    </div>
  );
}
