import React from "react";
import { useState, useEffect } from "react";
import useGenre from '../../Hooks/useGenre'
import axios from "axios";
import Genres from '../../components/Genres/Genres'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BasicPagination from "../../components/Pagination/Pagination";
import "./Movie.css";
import ContentModal from "../../components/ContentModal/ContentModal"
const Movies = () => {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [npages, setNPages] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selGenres, setSelGenres] = useState([]);
  const genreCode=useGenre(selGenres);
  useEffect(() => {
    getMovies();
  }, [page,genreCode]);
 
  const getMovies = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreCode}`
    );
    const res = data.data.results;
    console.log(res);
    setNPages(Math.floor(data.data.total_pages / 70));
    setDetails(res);
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
    <>
      <div className="PageTitle">Movies</div>
      <Genres type="movie" genres={genres} setGenres={setGenres} selGenres={selGenres} setSelGenres={setSelGenres} />
      <div className="movies">
        {details &&
          details.map((items) => {
            return (
              <ContentModal mediaType={'movie'} id={items.id} key={items.id}  >
              <Card sx={{ maxWidth: "300px" }}  className="Card">
                <div
                  className="rating"
                  style={{ backgroundColor: ratingColor(items.vote_average) }}
                >
                  {items.vote_average}
                </div>
                <CardMedia
                  component="img"
                  image={
                    items.poster_path &&
                    `https://image.tmdb.org/t/p/original/${items.poster_path}`
                  }
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
                      {items.title ||
                        items.original_title ||
                        items.original_name}
                    </b>
                  </Typography>
                </CardContent>

                <div className="card-actions">
                  <div className="first-air">
                    {items.release_date || items.first_air_date}
                  </div>
                  <div className="info-button">Info</div>
                  <div className="content-type">Movie</div>
                </div>
              </Card>
              </ContentModal>
            );
          })}
      </div>
      <BasicPagination setpage={setPage} npages={npages} />
    </>
  );
};

export default Movies;
