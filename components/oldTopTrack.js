import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";

const TopTrack = ({ token }) => {
  console.log("Token:", token); // Log token to verify it's received correctly
  const [data, setData] = useState([]);

  const handleGetTopMusic = () => {
    axios
      .get(TOP_TRACKS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button onClick={handleGetTopMusic}>Get Top Music</Button>
      {data?.items ? (
        data.items.map((item, index) => <p key={index}>{item.name}</p>)
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default TopTrack;
