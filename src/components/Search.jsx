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
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Search() {
  const [keyword, setKeyword] = useState("");

  async function handleSearch(event) {
    event.preventDefault();
    // await initiateAuth({
    //   username: email,
    //   password: password,
    //   clientId: import.meta.env.VITE_CLIENT_ID,
    // });
    console.log("Searching for: " + keyword);

    await axios
      .post()
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    // await userNotify(email);
    if (sessionStorage.getItem("accessToken")) {
      // window.location.href = "/chat";
    }
  }

  return (
    <Container fluid className="form-search">
      <Form onSubmit={handleSearch} className="search-form">
        <Form.Group className="mb-3" controlId="formBasicSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
}

export default Search;
