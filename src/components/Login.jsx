import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import "./Login.css";
import { useState } from "react";
import { initiateAuth, signUp } from "../utils/authService";
import { userNotify } from "../utils/notificationService";
import { Link, useNavigate } from "react-router";
import axios from "axios";
function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  // const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    // await initiateAuth({
    //   username: email,
    //   password: password,
    //   clientId: import.meta.env.VITE_CLIENT_ID,
    // });

    await axios
      .post(
        "https://ty9n22xoea.execute-api.ap-southeast-1.amazonaws.com/dev/api/auth",
        {
          username: email,
          password: password,
          clientId: import.meta.env.VITE_CLIENT_ID,
        }
      )
      .then(function (response) {
        console.log(response.data.auth);
        sessionStorage.setItem("idToken", response.data.auth.IdToken || "");
        sessionStorage.setItem(
          "accessToken",
          response.data.auth.AccessToken || ""
        );
        sessionStorage.setItem(
          "refreshToken",
          response.data.auth.RefreshToken || ""
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    // await userNotify(email); //migrate to Lambda backend
    if (sessionStorage.getItem("accessToken")) {
      // window.location.href = "/chat";
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    await signUp({
      username: email,
      password: password,
      clientId: import.meta.env.VITE_CLIENT_ID,
    });
    navigate("/confirm", { state: { email } });
  }

  return (
    <Container fluid className="form-signin">
      {!sessionStorage.getItem("accessToken") ? (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={isSignUp ? handleSignUp : handleLogin}
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
          </Form>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Log In"
              : "You don't have an account? Sign Up"}
          </Button>
        </div>
      ) : (
        <div>
          <h3>
            You are already logged in. Let use <Link to="/chat">Chat</Link> now
          </h3>
          <Button
            variant="info"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/login";
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Login;
