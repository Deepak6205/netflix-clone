import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    rating: 0,
    runtime: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isInList, setIsInList] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    // Fetch video data
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch((err) => console.error(err));

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        setMovieDetails({
          title: res.title,
          overview: res.overview,
          rating: res.vote_average,
          runtime: res.runtime,
          id: res.id,
          backdrop_path: res.backdrop_path,
        });
        setIsInList(isInWatchlist(res.id));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id, isInWatchlist]);

  const handleWatchlistToggle = () => {
    if (isInList) {
      removeFromWatchlist(movieDetails.id);
    } else {
      addToWatchlist(movieDetails);
    }
    setIsInList(!isInList);
  };

  return (
    <div className="player">
      <div className="player-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
          title="Go back"
        >
          <img src={back_arrow_icon} alt="back_arrow" />
          <span>Back</span>
        </button>
      </div>

      {isLoading ? (
        <div className="player-loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="player-container">
            {apiData.key ? (
              <iframe
                width="100%"
                height="600"
                src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`}
                title="trailer"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            ) : (
              <div className="no-trailer">
                <p>Trailer not available</p>
              </div>
            )}
          </div>

          <div className="player-info-container">
            <div className="player-details">
              <h1 className="movie-title">{movieDetails.title}</h1>

              <div className="movie-meta">
                <span className="rating">
                  <strong>IMDb Rating:</strong> {movieDetails.rating.toFixed(1)}/10
                </span>
                {movieDetails.runtime > 0 && (
                  <span className="runtime">
                    <strong>Duration:</strong> {movieDetails.runtime} min
                  </span>
                )}
                {apiData.published_at && (
                  <span className="release-date">
                    <strong>Released:</strong> {apiData.published_at.slice(0, 10)}
                  </span>
                )}
                {apiData.type && (
                  <span className="type">
                    <strong>Type:</strong> {apiData.type}
                  </span>
                )}
              </div>

              <p className="overview">{movieDetails.overview}</p>

              <div className="player-actions">
                <button className="play-btn">
                  <span>▶</span> Continue Watching
                </button>
                <button
                  className={`watchlist-btn ${isInList ? "active" : ""}`}
                  onClick={handleWatchlistToggle}
                >
                  <span>{isInList ? "✓" : "+"}</span>
                  {isInList ? "Remove from" : "Add to"} My List
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
