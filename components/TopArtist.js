import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, Image, Toast } from "react-bootstrap";
import {
  ArrowDownCircleFill,
  Copy,
  PatchQuestionFill,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import Link from "next/link";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

const TopArtist = ({ token }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [activeTimeRange, setActiveTimeRange] = useState("short_term");
  const [offset, setOffset] = useState(0);
  const [copyText, setCopyText] = useState(""); // State to hold text to be copied
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (token) {
      fetchTopArtists();
    }
  }, [token, activeTimeRange, offset]); // Fetch data when token, activeTimeRange, or offset changes

  const fetchTopArtists = async () => {
    try {
      const response = await axios.get(
        `${TOP_ARTISTS_ENDPOINT}?limit=5&offset=${offset}&time_range=${activeTimeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (offset === 0) {
        setData(response.data);
        // Set the copy text for the full list
        setCopyText(response.data.items.map((item) => item.name).join("\n"));
      } else {
        setData((prevData) => ({
          ...prevData,
          items: [...prevData.items, ...response.data.items],
        }));
        // Append new items to the copy text
        setCopyText(
          (prevText) =>
            prevText +
            "\n" +
            response.data.items.map((item) => item.name).join("\n")
        );
      }
    } catch (error) {
      console.error("Error fetching top artists: ", error);
    }
  };

  const handleTabChange = (timeRange) => {
    setActiveTimeRange(timeRange);
    setOffset(0); // Reset offset when changing time range
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setShowToast(true); // Show toast message after copying
  };

  const renderItems = () => {
    if (!token) {
      // If user is not logged in, render login icons
      return (
        <>
          <div className="d-flex align-items-center mb-3">
            <PatchQuestionFill size={50} style={{ marginRight: "40px" }} />
            <p className="mb-0 text-muted">Artist unavailable.</p>
          </div>
          <div className="d-flex align-items-center mb-3">
            <PatchQuestionFill size={50} style={{ marginRight: "40px" }} />
            <p className="mb-0 text-muted">Artist unavailable.</p>
          </div>
          <div className="d-flex align-items-center mb-3">
            <PatchQuestionFill size={50} style={{ marginRight: "40px" }} />
            <p className="mb-0 text-muted">Artist unavailable.</p>
          </div>
          <p className="text-secondary">
            <Link href="/login " legacyBehavior>
              <a style={{ textDecoration: "none", color: "#1DB954" }}>Login </a>
            </Link>
            to view top artists.
          </p>
        </>
      );
    } else if (data?.items) {
      // If user is logged in and data is available, render top artists' items
      return data.items.map((item, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          {item.images.length > 0 && (
            <Image
              src={item.images[0].url}
              alt={item.name}
              width={70}
              height={70}
              className="rounded-circle"
              style={{ marginRight: "40px" }}
            />
          )}
          <p className="mb-0">{item.name}</p>
        </div>
      ));
    } else {
      // If user is logged in but no data is available, show a message
      return <p>No data</p>;
    }
  };

  return (
    <>
      <Tabs
        id="topArtistsTabs"
        activeKey={activeTimeRange}
        onSelect={handleTabChange}
        className="mb-3">
        <Tab
          eventKey="short_term"
          title={<span style={{ color: "black" }}>4 weeks</span>}>
          {renderItems()}
          {data?.next && (
            <div className="d-flex align-items-center justify-content-between">
              <div
                onClick={loadMore}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <ArrowDownCircleFill size={30} />
              </div>
              <div
                onClick={handleCopy}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <Copy size={20} />
              </div>
            </div>
          )}
        </Tab>
        <Tab
          eventKey="medium_term"
          title={<span style={{ color: "black" }}>6 months</span>}>
          {renderItems()}
          {data?.next && (
            <div className="d-flex align-items-center justify-content-between">
              <div
                onClick={loadMore}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <ArrowDownCircleFill size={30} />
              </div>
              <div
                onClick={handleCopy}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <Copy size={20} />
              </div>
            </div>
          )}
        </Tab>
        <Tab
          eventKey="long_term"
          title={<span style={{ color: "black" }}>1 year</span>}>
          {renderItems()}
          {data?.next && (
            <div className="d-flex align-items-center justify-content-between">
              <div
                onClick={loadMore}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <ArrowDownCircleFill size={30} />
              </div>
              <div
                onClick={handleCopy}
                style={{ cursor: "pointer", color: "#1DB954" }}>
                <Copy size={20} />
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={1700} // 3 seconds
        autohide
        style={{
          position: "fixed",
          top: "67px",
          right: "20px",
          zIndex: 9999,
        }}>
        <Toast.Header>
          <strong className="me-auto">Message</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>{`Clipboard updated with ${data?.items?.length} artists`}</Toast.Body>
      </Toast>
    </>
  );
};

export default TopArtist;
