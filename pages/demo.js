import React, { useState } from "react";
import Head from "next/head";
import { Card, Col, Row, Button } from "react-bootstrap";
import { LaptopFill, PhoneFill } from "react-bootstrap-icons";

const Demo = () => {
  const [selectedDemo, setSelectedDemo] = useState("web");

  const handleDemoChange = (demo) => {
    setSelectedDemo(demo);
  };

  return (
    <>
      <Head>
        <title>demo</title>
      </Head>
      <div>
        <h1
          className="text-center"
          style={{ marginTop: "60px", marginBottom: "30px" }}>
          demo
        </h1>
        <div className="text-center mb-3">
          <Button
            style={{ backgroundColor: "#1DB954", borderColor: "#1DB954" }}
            variant="primary"
            onClick={() => handleDemoChange("web")}
            className={selectedDemo === "web" ? "active" : ""}>
            web
          </Button>{" "}
          <Button
            style={{ backgroundColor: "#1DB954", borderColor: "#1DB954" }}
            variant="primary"
            onClick={() => handleDemoChange("mobile")}
            className={selectedDemo === "mobile" ? "active" : ""}>
            mobile
          </Button>
        </div>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card>
              <Card.Header
                style={{
                  backgroundColor: "#1DB954",
                  borderColor: "#1DB954",
                  color: "white",
                }}>
                {selectedDemo === "web" ? <LaptopFill /> : <PhoneFill />}
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <video
                  src={
                    selectedDemo === "web" ? "web_demo.mov" : "mobile_demo.MP4"
                  }
                  controls
                  style={{ maxHeight: "300px", maxWidth: "100%" }}></video>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Demo;
