import "./App.css";
import logo from "./assets/jamz-logo.svg";
import React, { useEffect, useState } from "react";
import Album from "./components/Album";
import Filters from "./components/Filters";
import { Box } from "@mui/material";

const { getData } = require("./data.js");

function App() {
  const [totalTracks, setTotalTracks] = useState(0);
  const [favItems, setFavItems] = useState([]);
  const [musicData, setData] = useState([]);
  const [filters, setFilters] = useState({
    "type": "All", 
    "favorites": false, 
    "date": {
      "today": false, 
      "yesterday": false
    }
  })
  
  // per stack overflow, establish today + yesterday strings
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  var yesterday = getPreviousDay(new Date());

  function getPreviousDay(date = new Date()) {
    var yesterday = new Date(date.getTime());
    yesterday.setDate(date.getDate() - 1);

    var y_dd = String(yesterday.getDate()).padStart(2, '0');
    var y_mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    var y_yyyy = yesterday.getFullYear();
    yesterday = y_yyyy + '-' + y_mm + '-' + y_dd;
  
    return yesterday;
  }

  // func to get music from Spotify API
  async function getMusic() {
    setData(await getData());
  }

  // populate music array
  useEffect(() => {
    getMusic();
  }, []);

  const matchesFilters = (item) => {
    for (let filter in filters) {
      if (!matchesFilterType(item, filter)) {
        return false;
      }
    }

    return true;
  }

  // func to check if an album matches a filter
  const matchesFilterType = (item, filter) => {
    // filter by type
    if (filter === "type") {
      if (filters["type"] === "All") {
        return true;
      } else if (filters["type"] === item.album_type) {
        return true;
      } else {
        return false;
      }
    }

    // filter by favorites
    if (filter === "favorites") {
      if (filters["favorites"] === true) {
        return favItems.includes(item);
      }
      return true;
    }

    // filter by release date
    if (filter === "date") {
      if (filters["date"]["today"] && item.release_date === today) {
        return true;
      }
      if (filters["date"]["yesterday"] && item.release_date === yesterday) {
        return true;
      }
      if ((!filters["date"]["today"]) && (!filters["date"]["yesterday"])) {
        return true;
      }
      return false;
    }

    return true;
  };

  // Similar to componentDidMount and componentDidUpdate:
  return (
    <Box className="App">

      <Filters
        favItems={favItems}
        setFavItems={setFavItems}
        totalTracks={totalTracks}
        filters={filters}
        setFilters={setFilters}
        musicData={musicData}
        setData={setData}
      ></Filters>

      <Box className="right-contents" component="main">
        <Box className="logo-title">
          <Box className="logo-container">
            <img src={logo} className="logo" alt="logo"/>
            <h1 className="title">Jamz Findz</h1>
          </Box>
          <h2 className="intro">find the newest releases here!</h2>
        </Box>
        <div className="page">
          {musicData.length === 0 ? (
            <h3>Loading...</h3>
          ) : (
            <div className="albums-container">
              {musicData.map((item) =>
                matchesFilters(item) ? 
                <Album 
                item={item}
                favItems={favItems}
                setFavItems={setFavItems}
                totalTracks={totalTracks}
                setTotalTracks={setTotalTracks}
                ></Album> : null
              )}
            </div>
          )}
        </div>
      </Box>
      
    </Box>
  );

}

export default App;
