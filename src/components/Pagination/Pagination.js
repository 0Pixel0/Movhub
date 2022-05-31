import * as React from "react";
import Pagination from "@mui/material/Pagination";
import "./Pagination.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function BasicPagination(props) {
  const handlePageChange = (page) => {
    props.setpage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={props.npages}
          size="large"
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}
