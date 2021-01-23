import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/movie-card/MovieCard";
import MovieHeader from "./components/movie-header/MovieHeader";
import MovieDetails from "./components/movie-details/MovieDetails";

let timer = "";

function App() {
  const [isOpen, onModalToggle] = useState(false);
  const [imdbId, setImdbId] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const removeCard = (itemIndex) => {
    const currentMovies = [...movieData];
    currentMovies.splice(itemIndex, 1);
    setMovieData(currentMovies);
  };

  const onModalOpen = (id) => {
    onModalToggle(true);
    setImdbId(id);
  }

  useEffect(() => {
    const movieApiCall = () => {
      fetch(`http://www.omdbapi.com/?apikey=a3a1e4c0&s=${searchText}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.Search) {
            setMovieData(response.Search);
            setIsSuccess(true);
          } else {
            setIsError(true);
            setErrorMsg(response.Error);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setErrorMsg("Some Technical Issues");
          setIsLoading(false);
        });
    };

    const efficientCall = () => {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        movieApiCall();
      }, 300);
    };

    efficientCall();
  }, [searchText]);

  return (
    <>
      <div className="movie-app-header">
        <div className="container">
          <MovieHeader
            setSearchText={setSearchText}
            setIsTouched={setIsTouched}
            isTouched={isTouched}
          />
        </div>
      </div>
      <div className="container">
        <div className="row mobile-responsive">
          <h2 className="movie-card-heading">Up Next</h2>
          {isLoading ? <p className="is-loading">Loading.....</p> : null}
          {isSuccess && movieData.length
            ? movieData.map((movie, index) => {
                return (
                  <MovieCard
                    movieData={movie}
                    key={index}
                    itemIndex={index}
                    removeCard={removeCard}
                    onModalOpen={onModalOpen}
                  />
                );
              })
            : null}
          {isError & isTouched ? <p className="is-error">Error: {errorMsg}</p> : null}
        </div>
      <MovieDetails isOpen={isOpen} imdbId={imdbId} onModalToggle={onModalToggle}/>
      </div>
    </>
  );
}

export default App;
