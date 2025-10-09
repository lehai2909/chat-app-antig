// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {confirmSignUp} from "../utils/authService";
import "./Confirm.css";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, confirmationCode);
      alert("Account confirmed successfully!\nSign in on next page.");
      navigate("/login");
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };

  return (
    <Container fluid className="form-signin">
      <h2>Confirm your email</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Verification Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Form>
    </Container>
  );
};

export default Confirm;
