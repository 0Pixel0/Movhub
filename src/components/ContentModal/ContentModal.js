import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
const style = {
  modal: {
    height: "96%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    flexWrap: "wrap",
    position: "absolute",
    top: "2vh",
    left: "5vw",
    backgroundColor: "black",
    borderRadius:'12px',
    color: "white",
    overflow:"scroll"
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "50%",
  },
  desc: {
    display:'flex',
    justifyContent:'center',
    marginTop: "5px",
    height: "12.5%",
    width: "90%",
    fontFamily:'Patrick Hand,cursive',
    overflow: "scroll",
    fontSize:'20px'
  },
  videoButton:{
    marginTop:'1vh'
  }
};

export default function ContentModal({ children, mediaType, id }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [videos, setVideos] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getContent = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
    setContent(data);
    // console.log(data);
  };
  const getVideos = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    // console.log(data.results);
    setVideos(data.results[0]?.key);
   
  };
  React.useEffect(() => {
    getContent();
    getVideos();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style.modal}>
            <div style={style.paper}>
              <img
                style={{ width: "100%", height: "100%" }}
                alt={content.title || content.original_title }
                src={
                  content.poster_path &&
                  `https://image.tmdb.org/t/p/original/${content.backdrop_path || content.poster_path}`
                }
              ></img>
            </div>
            <div style={style.desc}>
              <span>{content.overview || content.original_name}</span>
            </div>
            
            <Button variant="contained" color="secondary" target='__blank' href={`https://www.youtube.com/watch?v=${videos}`} style={style.videoButton}>
              Watch Trailer
            </Button>
            <Carousel mediaType={mediaType} id={id}></Carousel>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
