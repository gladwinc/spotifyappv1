import React, { useState, useEffect } from "react";
import axios from "axios";

const TopGenres = ({ token, activeTimeRange }) => {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    fetchTopGenres();
  }, [token, activeTimeRange]);

  const fetchTopGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${activeTimeRange}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const genresMap = countGenres(response.data.items);
      const sortedGenres = [...genresMap.entries()].sort((a, b) => b[1] - a[1]);
      setTopGenres(sortedGenres.slice(0, 5));
    } catch (error) {
      console.error("Error fetching top genres:", error);
    }
  };

  const countGenres = (items) => {
    const genresMap = new Map();
    items.forEach((item) => {
      item.genres.forEach((genre) => {
        genresMap.set(genre, (genresMap.get(genre) || 0) + 1);
      });
    });
    return genresMap;
  };

  return (
    <div>
      <h2>Top 5 Genres</h2>
      <ul>
        {topGenres.map(([genre, count]) => (
          <li key={genre}>{`${genre}: ${count}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopGenres;
