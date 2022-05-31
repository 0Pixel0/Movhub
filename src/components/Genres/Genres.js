import * as React from 'react';
import Chip from '@mui/material/Chip';
import "./Genres.css"
import { useEffect } from 'react';
import axios from 'axios';
export default function Genres(props) {
const handleClick = (g) => {
    props.setSelGenres([...props.selGenres,g]);
    props.setGenres(props.genres.filter((gen)=>{return gen.id!=g.id}))
};

const handleDelete = (g) => {
  props.setSelGenres(props.selGenres.filter((gen)=>{return gen.id!=g.id}));
  props.setGenres([...props.genres,g]);
};

  const fetchGenres=async()=>{
     const {data} =await axios.get(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
     
     props.setGenres(data.genres);
     console.log(data.genres);
  }

  useEffect(() => {
    fetchGenres();
    
    return () => {
      props.setGenres({});
    }
  }, [])
  


  return (
    <div className="gen-stack">
    {
        props.selGenres.map((g)=>{
        return (
        <Chip
        color='primary'
        key={g.id}
        label={g.name}
      
        onDelete={()=>handleDelete(g)}
      />)
      })
      }
      { props.genres &&
        props.genres.map((g)=>{
        return (
        <Chip
        color='secondary'
        key={g.id}
        label={g.name}
        onClick={()=>handleClick(g)}
        
      />)
      })
      }
     </div>
   
  );
}
