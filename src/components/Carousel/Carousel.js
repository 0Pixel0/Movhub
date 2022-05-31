import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { useEffect } from "react";
import "./Carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ mediaType, id }) => {
  const [credits, setCredits] = useState([]);
  useEffect(() => {
    fetchCredits();
  }, []);

  const responsive = {
    0:{
      items:1
    },
    432:{
      items:3
    },
    1024:{
      items:4
    }
  };

  const items =
    credits &&
    credits.map((c) => (
      <div className="carouselItem">
        <img
          src={
            c.profile_path &&
            `https://image.tmdb.org/t/p/w200/${c.profile_path}`
          }
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setCredits(data.cast);
   
  };
  return (
    <AliceCarousel
      autoPlay={true}
      autoPlayInterval={1000}
      infinite
      mouseTracking
      disableDotsControls
      disableButtonsControls
      items={items}
      responsive={responsive}
    />
  );
};
export default Carousel;
