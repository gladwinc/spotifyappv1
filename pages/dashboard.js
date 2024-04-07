import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import TopArtist from "@/components/TopArtist";
import TopTrack from "@/components/TopTrack";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  return (
    <>
      <Head>
        <title>dashboard</title>
      </Head>
      <div>
        <h1
          className="text-center"
          style={{ marginTop: "60px", marginBottom: "30px" }}>
          dashboard
        </h1>
        <Row>
          <Col>
            <Card
              style={{
                marginBottom: "20px",
                maxHeight: "625px",
                overflowY: "auto",
              }}>
              <Card.Header
                style={{
                  backgroundColor: "#1DB954",
                  borderColor: "#1DB954",
                  color: "white",
                }}>
                top artists
              </Card.Header>
              <Card.Body>
                <TopArtist token={accessToken} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                marginBottom: "20px",
                maxHeight: "610px",
                overflowY: "auto",
              }}>
              <Card.Header
                style={{
                  backgroundColor: "#1DB954",
                  borderColor: "#1DB954",
                  color: "white",
                }}>
                top tracks
              </Card.Header>
              <Card.Body>
                <TopTrack token={accessToken} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
