import axios from "axios";
import "./Trending.css";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicPagination from "../../components/Pagination/Pagination";
import ContentModal from "../../components/ContentModal/ContentModal";

const Trending = () => {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [nPages,setnPages]=useState(0);
  useEffect(() => {
    getTrending();
  }, [page]);

  const getTrending = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    const res = data.results;
    setDetails(res);
    setnPages(data.total_pages/2);
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
      <span className="pageTitle"></span>
      <div className="trending">
        {details.map((items) => {
          return (
            <ContentModal mediaType={items.media_type} id={items.id} key={items.id} >
            <Card sx={{ maxWidth: "300px" }} className="Card">
              <div
                className="rating"
                style={{ backgroundColor: ratingColor(items.vote_average) }}
              >
                {items.vote_average}
              </div>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original/${items.poster_path}`}
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
                  {items.media_type === "movie" ? "Movie" : "TV"}
                </div>
              </div>
            </Card>
          </ContentModal>
          );
        })}
      </div>
      <BasicPagination setpage={setPage} npages={nPages} />
    </div>
  );
};

export default Trending;
