export default function Message({ content, isSender, type = "text" }) {
  return (
    <div
      className={`message ${isSender ? "message-sender" : "message-friend"}`}
    >
      {type === "text" && <p>{content}</p>}
      {type === "image" && (
        <img src={content} alt="Sent image" className="message-image" />
      )}
      {type === "video" && (
        <video controls className="message-video">
          <source src={content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
