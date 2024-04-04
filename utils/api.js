export const getTokenFromUrl = () => {
  const queryString = new URLSearchParams(window.location.hash.substring(1));

  const accessToken = queryString.get("access_token");
  const tokenType = queryString.get("token_type");
  const expiresIn = queryString.get("expires_in");
  const state = queryString.get("state");

  console.log("Access Token:", accessToken);
  console.log("Token Type:", tokenType);
  console.log("Expires In:", expiresIn);
  console.log("State:", state);

  return { accessToken, tokenType, expiresIn, state };
};
