import naza from "/naza.jpeg";
import "./HomePage.css";
import {Link} from "react-router";
import Button from "react-bootstrap/Button";

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Amazing Chat App</h1>
      <img src={naza} alt="Naza" className="logo" />
      <div>
        <Button variant="light">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
