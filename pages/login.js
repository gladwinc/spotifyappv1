import { Card, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import TopArtist from "@/components/TopArtist";
import TopTrack from "@/components/TopTrack";
import { getTokenFromUrl } from "@/utils/api";
import { useRouter } from "next/router"; // Import useRouter from Next.js

const CLIENT_ID = "f93eafeebc55462282df6aae7a883874";
const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/login/";
const SCOPES = ["user-top-read"];

const Login = () => {
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const fetchToken = () => {
      const { accessToken } = getTokenFromUrl();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        router.push("/dashboard");
      }
    };

    if (window.location.hash) {
      fetchToken();
    }
  }, [router]);

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Card>
        <Card.Header>
          <Image
            src={"/spotify_logo.svg"}
            alt="Spotify logo"
            width={35}
            height={35}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Discover what you've been listening to the most!
          </Card.Title>
          <Card.Text>Please login to your Spotify account to start.</Card.Text>
          <Button
            variant="primary"
            onClick={handleLogin}
            style={{ backgroundColor: "#1DB954", borderColor: "#1DB954" }}>
            Login to Spotify
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
