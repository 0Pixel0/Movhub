import * as React from 'react';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
const useStyles=makeStyles({
  root:{
    width:'100%',
    position:'fixed',
    
    backgroundColor:'rgb(43, 192, 142) !important',
    bottom:0,
    zIndex:100
  },
});
export default function SimpleBottomNavigation() {
  const classes=useStyles();
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
      if(value===0){
        navigate('/');
      }else if(value===1){navigate('/movies');}
      else if(value===2){navigate('/series');}
      else if(value===3){navigate('/search');}
  }, [value,navigate])
  
  
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
      <BottomNavigationAction  style={{color:'white'}}  label="Trending" icon={<WhatshotIcon/>} />
        <BottomNavigationAction  style={{color:'white'}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="Search" icon={<SearchIcon/>} />
      </BottomNavigation>
    </Box>
  );
}