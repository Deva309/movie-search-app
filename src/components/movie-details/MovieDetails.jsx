import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./MovieDetails.css";

export default function MovieDetails(props) {
  const { isOpen, imdbId, onModalToggle } = props;

  const [movieDetails, setMovieDetails] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onModalClose = () => {
    onModalToggle(false);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  };

  useEffect(() => {
    const fetchModaldata = () => {
      setIsLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=a3a1e4c0&i=${imdbId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setMovieDetails(response);
          setIsSuccess(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    };
    if (isOpen) {
      fetchModaldata();
    }
  }, [imdbId, isOpen]);

  return (
    <Modal open={isOpen} onClose={onModalClose} center={true}>
      {isLoading ? <p className="is-loading">Loading.....</p> : null}
      {isSuccess ? (
        <div className="modal-details-wrapper">
          {Object.keys(movieDetails).map((item, index) => {
            return (
              <div key={index}>
                <div className="column-one">{item}</div>
                <div className="column-two">
                  {" "}
                  :{" "}
                  {typeof movieDetails[item] === "object"
                    ? null
                    : movieDetails[item]}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {isError ? <p className="is-error">Technical Issue</p> : null}
    </Modal>
  );
}
