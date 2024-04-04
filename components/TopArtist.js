import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, Image } from "react-bootstrap";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

const TopArtist = ({ token }) => {
  const [data, setData] = useState([]);
  const [activeTimeRange, setActiveTimeRange] = useState("short_term");
  console.log("token", token);

  useEffect(() => {
    fetchTopArtists();
  }, [token, activeTimeRange]); // Fetch data when token or activeTimeRange changes

  const fetchTopArtists = async () => {
    try {
      const response = await axios.get(
        `${TOP_ARTISTS_ENDPOINT}?limit=5&time_range=${activeTimeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {}
  };

  const handleTabChange = (timeRange) => {
    setActiveTimeRange(timeRange);
  };

  return (
    <>
      <Tabs
        id="topArtistsTabs"
        activeKey={activeTimeRange}
        onSelect={handleTabChange}
        className="mb-3">
        <Tab eventKey="short_term" title="4 weeks">
          {data?.items ? (
            data.items.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                {item.images.length > 0 && (
                  <Image
                    src={item.images[0].url} // Use the second image (medium size)
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-circle"
                    style={{ marginRight: "40px" }} // Added custom style for spacing to the right
                    // Added mr-3 for spacing to the right
                  />
                )}
                <p className="mb-0">{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data</p>
          )}
        </Tab>
        <Tab eventKey="medium_term" title="6 months">
          {data?.items ? (
            data.items.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                {item.images.length > 0 && (
                  <Image
                    src={item.images[0].url} // Use the second image (medium size)
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-circle"
                    style={{ marginRight: "40px" }} // Added custom style for spacing to the right
                    // Added mr-3 for spacing to the right
                  />
                )}
                <p className="mb-0">{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data</p>
          )}
        </Tab>
        <Tab eventKey="long_term" title="1 year">
          {data?.items ? (
            data.items.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                {item.images.length > 0 && (
                  <Image
                    src={item.images[0].url} // Use the second image (medium size)
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-circle" // Added mr-3 for spacing to the right
                    style={{ marginRight: "40px" }} // Added custom style for spacing to the right
                  />
                )}
                <p className="mb-0">{item.name}</p>
              </div>
            ))
          ) : (
            <p>No data</p>
          )}
        </Tab>
      </Tabs>
    </>
  );
};
export default TopArtist;
