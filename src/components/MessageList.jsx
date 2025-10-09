import Message from "./Message";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";

export default function MessageList({messages}) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message key={index} content={msg.content} sender={msg.sender} />
      ))}

      {/* <Container>
        <Row>
          <Col md="4">
            <div className="chat-sidebar">
              <h3>Contacts</h3>
              <ul>
                <li>Alice</li>
                <li>Bob</li>
                <li>Charlie</li>
              </ul>
            </div>
          </Col>
          <Col md="8">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <Message key={index} content={msg.content} sender={msg.from} />
              ))}
            </div>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
