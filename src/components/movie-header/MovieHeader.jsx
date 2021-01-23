import React from "react";
import "./MovieHeader.css";

export default function MovieHeader(props) {
  const { isTouched, setIsTouched, setSearchText } = props;
  const handleChange = (e) => {
    !isTouched && setIsTouched(true);
    setSearchText(e.target.value);
  };
  return (
    <>
      <h1 className="main-heading">My WatchList</h1>
      <p className="heading-description">Search To Add Movies</p>
      <input
        className="header-search-field"
        placeholder="Search for a movie"
        onChange={handleChange}
      />
    </>
  );
}
