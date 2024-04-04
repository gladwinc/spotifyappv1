import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopArtist from "@/components/TopArtist";
import TopTrack from "@/components/TopTrack";
import { getTokenFromUrl } from "@/utils/api";

const CLIENT_ID = "f93eafeebc55462282df6aae7a883874";
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/login/";

const SCOPES = ["user-top-read"];

const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const getTokenFromUrl = () => {
      const queryString = new URLSearchParams(
        window.location.hash.substring(1)
      );

      const accessToken = queryString.get("access_token");
      const tokenType = queryString.get("token_type");
      const expiresIn = queryString.get("expires_in");
      const state = queryString.get("state");

      console.log("Access Token:", accessToken);
      console.log("Token Type:", tokenType);
      console.log("Expires In:", expiresIn);
      console.log("State:", state);

      setAccessToken(accessToken);
      setTokenType(tokenType);
      setExpiresIn(expiresIn);
      setState(state);
    };

    if (window.location.hash) {
      getTokenFromUrl();
    }
  }, []);

  const handleLogin = () => {
    const url =
      `${AUTHORIZE_URL}?` +
      `client_id=${encodeURIComponent(CLIENT_ID)}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(SCOPES.join(" "))}&` +
      `response_type=token&` +
      `show_dialog=true`;

    window.location = url;
  };
  return (
    <Card>
      <Card.Header>spotify v1</Card.Header>
      <Card.Body>
        <Card.Title>
          Discover what you've been listening to the most!
        </Card.Title>
        <Card.Text>Please login to your Spotify account to start.</Card.Text>
        <Button variant="primary" onClick={handleLogin}>
          Login to Spotify
        </Button>
        <br />
        <br />
        <TopArtist token={accessToken} />
        <TopTrack token={accessToken} />
      </Card.Body>
    </Card>
  );
};

export default Login;
