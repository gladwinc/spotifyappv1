import { useRouter } from "next/router";
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
    <Layout>
      <div>
        <h1 className="text-center mt-5 mb-5">dashboard</h1>
        <Row>
          <Col>
            <Card>
              <Card.Header>top artists</Card.Header>
              <Card.Body>
                <TopArtist token={accessToken} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>top tracks</Card.Header>
              <Card.Body>
                <TopTrack token={accessToken} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Dashboard;
