import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

// REPLACE THIS WITH YOUR ACTUAL GOOGLE CLIENT ID
// const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID_HERE";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // console.group("Google Login Success Debug Info");
      // console.log("Raw Credential Response:", credentialResponse);
      // console.log("ID Token (credential):", credentialResponse.credential);
      // console.log("Client ID matching:", credentialResponse.clientId);

      const decoded = jwtDecode(credentialResponse.credential);
      // console.log("Decoded ID Token Payload:", decoded);
      // console.log("User Email:", decoded.email);
      // console.log("User Name:", decoded.name);
      // console.log("User Picture:", decoded.picture);
      // console.groupEnd();

      // console.groupEnd();

      sessionStorage.setItem("user", decoded.name);
      sessionStorage.setItem("email", decoded.email);
      sessionStorage.setItem("avatar", decoded.picture);
      // Store full profile for User Info page
      sessionStorage.setItem("userProfile", JSON.stringify(decoded));

      // Force a hard redirect to ensure App component re-evaluates authentication state
      console.log("Redirecting to chat...");
      window.location.href = "/chat";
    } catch (err) {
      console.error("Error decoding token:", err);
      setError("Failed to process login information.");
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google Login Failed");
    setError("Google Login Failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="glass-panel login-card">
          <h2 className="login-title">Welcome</h2>
          <p className="login-subtitle">Sign in to start chatting</p>

          <div className="login-actions">
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                theme="filled_black"
                shape="pill"
                size="large"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            {GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE" && (
              <div className="setup-notice">
                <p>
                  ⚠️ <strong>Configuration Needed</strong>
                </p>
                <p>
                  Please update <code>Login.jsx</code> with your Google Client
                  ID.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
