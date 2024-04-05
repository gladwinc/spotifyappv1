import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, Image } from "react-bootstrap";
import { ArrowDownCircleFill } from "react-bootstrap-icons";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

const TopArtist = ({ token }) => {
  const [data, setData] = useState([]);
  const [activeTimeRange, setActiveTimeRange] = useState("short_term");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchTopArtists();
  }, [token, activeTimeRange, offset]); // Fetch data when token, activeTimeRange or offset changes

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
      } else {
        setData((prevData) => ({
          ...prevData,
          items: [...prevData.items, ...response.data.items],
        }));
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

  const renderItems = () => {
    return data?.items ? (
      data.items.map((item, index) => (
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
      ))
    ) : (
      <p>No data</p>
    );
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
            <div
              onClick={loadMore}
              style={{ cursor: "pointer", color: "#1DB954" }}>
              <ArrowDownCircleFill size={30} />
            </div>
          )}
        </Tab>
        <Tab
          eventKey="medium_term"
          title={<span style={{ color: "black" }}>6 months</span>}>
          {renderItems()}
          {data?.next && (
            <div
              onClick={loadMore}
              style={{ cursor: "pointer", color: "#1DB954" }}>
              <ArrowDownCircleFill size={30} />
            </div>
          )}
        </Tab>
        <Tab
          eventKey="long_term"
          title={<span style={{ color: "black" }}>1 year</span>}>
          {renderItems()}
          {data?.next && (
            <div
              onClick={loadMore}
              style={{ cursor: "pointer", color: "#1DB954" }}>
              <ArrowDownCircleFill size={30} />
            </div>
          )}
        </Tab>
      </Tabs>
    </>
  );
};

export default TopArtist;
