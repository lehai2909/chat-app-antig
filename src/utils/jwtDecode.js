import {CognitoJwtVerifier} from "aws-jwt-verify";

export async function jwtDecode(user_pool_id, client_id) {
  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: user_pool_id,
    tokenUse: "access",
    clientId: client_id,
  });

  try {
    const payload = await verifier.verify(
      sessionStorage.getItem("accessToken") // the JWT as string
    );
    console.log("Token is valid. Payload:", payload);
    return payload.username;
  } catch {
    console.log("Token not valid!");
    return null;
  }
}
