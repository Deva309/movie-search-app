import React from "react";

import "./MovieCard.css";

export default function MovieCard(props) {
  const {
    movieData: { Poster, Title, Year, imdbID },
    removeCard,
    itemIndex,
    onModalOpen,
  } = props;

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 movie-card-wrapper">
      <div className="movie-details">
        <div className="movie-image" onClick={() => onModalOpen(imdbID)}>
          <img
            alt={`Missing Poster: ${Title}`}
            src={Poster}
            className="movie-card-image"
          />
        </div>
        <div className="movie-data">
          <p>{Title}</p>
          <p>{Year}</p>
        </div>
      </div>
      <div className="movie-card-status">
        <div className="movie-card-status-first">Watched</div>
        <div className="movie-card-status-second">
          <button onClick={() => removeCard(itemIndex)}>&#10060;</button>
        </div>
      </div>
    </div>
  );
}
