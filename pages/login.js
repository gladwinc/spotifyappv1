import { Card, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import { AUTHORIZE_URL, REDIRECT_URI, SCOPES } from "@/constants/constants";
import { getTokenFromUrl } from "@/utils/api";
import { useRouter } from "next/router";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const Login = () => {
  const router = useRouter();

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
      <Head>
        <title>login</title>
      </Head>
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
          <Card.Title>Explore your top tracks and artists!</Card.Title>
          <Card.Text>Please login to your Spotify account to begin.</Card.Text>
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
