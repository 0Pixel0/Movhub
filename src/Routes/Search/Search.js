import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tabs, Tab, TextField, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import { SearchTwoTone } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import './search.css';
import ContentModal from "../../components/ContentModal/ContentModal"
const Search = () => {
  const [searchType, setSearchType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(".");
  const [details, setDetails] = useState([]);
  const [nPages,setNPages]=useState(1);
  useEffect(() => {
    window.scrollTo(0,0)
    getSearch();
  }, [page,searchType]);

 
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const getSearch = async () => {
    console.log(searchType);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${searchType?'tv':'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&query=${searchText}`
    );
    // console.log(data);
    setDetails(data.results);
    setNPages(data.total_pages);
  };
  const ratingColor = (rating) => {
    if (rating <= 5) {
      return "#e63946";
    } else if (rating > 5 && rating < 7.2) {
      return "blue";
    } else {
      return "lightgreen";
    }
  };

  return (
    <div>
      <div style={{ display: "flex", margin: "10 0" }}>
        <ThemeProvider theme={theme}>
          <TextField
            style={{ flex: 1 }}
            size="medium"
            className="searchBox"
            label="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button style={{ marginLeft: 10 }} onClick={getSearch}>
            <SearchTwoTone color="primary"></SearchTwoTone>
          </button>
        </ThemeProvider>
      </div>
      <ThemeProvider theme={theme}>
        <Tabs
          value={searchType}
          onChange={(e, newValue) => {
            setSearchType(newValue);
            setPage(1);
          }}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="primary"
          aria-label="wrapped label tabs example"
        >
          <Tab label="Search Movies" />
          <Tab label="Search Series" />
        </Tabs>
      </ThemeProvider>
      <div className="searchContent">
      {details.map((items) => {
        return (
          <ContentModal mediaType={searchType?'tv':'movie'} id={items.id} key={items.id} >
          <Card sx={{ maxWidth: "300px" }}  className="Card">
            <div
              className="rating"
              style={{ backgroundColor: ratingColor(items.vote_average) }}
            >
              {items.vote_average}
            </div>
            <CardMedia
              component="img"
              image= {items.poster_path && `https://image.tmdb.org/t/p/original/${items.poster_path}`}
              alt={items.title}
            />

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="Title"
              >
                <b>
                  {items.title || items.original_title || items.original_name}
                </b>
              </Typography>
            </CardContent>

            <div className="card-actions">
              <div className="first-air">
                {items.release_date || items.first_air_date}
              </div>
              <div className="info-button">Info</div>
              <div className="content-type">
                {searchType?"TV" : "Movie"}
              </div>
            </div>
          </Card>
          </ContentModal>
        );
      })}
        {searchText && (details.length==0) && ((searchType)? <h2>No Series Found</h2>:<h2>No Movies Found</h2>)}
      </div>
    </div>
  );
};

export default Search;
