import "./HomePage.css";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="glass-panel hero-section">
        <h1 className="hero-title">Amazing Chat App</h1>
        <div className="logo-container">
          <img src="/naza.jpeg" alt="Naza" className="logo" />
        </div>
        <p className="hero-subtitle">Connect with friends in a cute & colorful way!</p>
        <div className="cta-container">
          <Link to="/login" className="btn-primary-link">Start Chatting</Link>
        </div>
      </div>
    </div>
  );
}
