import "./App.css";
import Header from "./components/Header.js";
import SimpleBottomNavigation from "./components/Nav.js";
import { Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from './Routes/Trending/Trending.js';
import Series from './Routes/Series/Series.js';
import Movies from './Routes/MovieFolder/Movies.js';
import Search from './Routes/Search/Search.js';
function App() {
  return (
<>
      <Header />
      <div className="App">
        <Container>
        
          <Routes>
          
            <Route exact path="/" element={<Trending/>}></Route>
            <Route exact path="movies" element={<Movies/>}></Route>
            <Route exact path="series" element={<Series/>}></Route>
            <Route exact path="search" element={<Search/>}></Route>
            
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
