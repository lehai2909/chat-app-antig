import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: "ap-southeast-1",
});

export const initiateAuth = async ({username, password, clientId}) => {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: clientId,
    });
    const result = await client.send(command);
    console.log("Sign in success: ", result);
    if (result.AuthenticationResult) {
      sessionStorage.setItem(
        "idToken",
        result.AuthenticationResult.IdToken || ""
      );
      sessionStorage.setItem(
        "accessToken",
        result.AuthenticationResult.AccessToken || ""
      );
      sessionStorage.setItem(
        "refreshToken",
        result.AuthenticationResult.RefreshToken || ""
      );
    }
    // setToken(result.AuthenticationResult.IdToken);
    // setError("");
    alert("Login successfully!");
  } catch (error) {
    alert(error);
  }
};

export const signUp = async ({username, password, clientId}) => {
  const SignUpCommandInput = {
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: username,
      },
    ],
  };
  try {
    const command = new SignUpCommand(SignUpCommandInput);
    const response = await client.send(command);
    console.log("Sign up success!");
  } catch (error) {
    alert(error);
  }
};

export const confirmSignUp = async (username, code) => {
  const ConfirmSignUpCommandInput = {
    ClientId: import.meta.env.VITE_CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(ConfirmSignUpCommandInput);
    await client.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    alert(error);
  }
};
