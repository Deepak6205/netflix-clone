import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
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
    
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        setIsInList(isInWatchlist(res.id));
      })
      .catch((err) => console.error(err));

    
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        setCast(res.cast?.slice(0, 6) || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id, isInWatchlist]);

  const handleWatchlistToggle = () => {
    if (isInList && movie) {
      removeFromWatchlist(movie.id);
    } else if (movie) {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        overview: movie.overview,
      });
    }
    setIsInList(!isInList);
  };

  const handleWatch = () => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="movie-details-page">
      <Navbar />

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : movie ? (
        <>
          
          <div
            className="hero-banner"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="hero-content">
              <h1>{movie.title}</h1>
              <div className="hero-meta">
                <span className="rating">
                  <strong>⭐ {movie.vote_average?.toFixed(1)}/10</strong>
                </span>
                {movie.release_date && (
                  <span className="year">
                    <strong>{new Date(movie.release_date).getFullYear()}</strong>
                  </span>
                )}
                {movie.runtime && (
                  <span className="runtime">
                    <strong>{movie.runtime} min</strong>
                  </span>
                )}
              </div>
              <p className="overview">{movie.overview}</p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={handleWatch}>
                  ▶ Watch Now
                </button>
                <button
                  className={`btn-secondary ${isInList ? "active" : ""}`}
                  onClick={handleWatchlistToggle}
                >
                  {isInList ? "✓ In My List" : "+ Add to List"}
                </button>
              </div>
            </div>
          </div>

        
          <div className="details-section">
            <div className="details-grid">
              <div className="detail-item">
                <h3>Genres</h3>
                <p>
                  {movie.genres?.length > 0
                    ? movie.genres.map((g) => g.name).join(", ")
                    : "N/A"}
                </p>
              </div>

              <div className="detail-item">
                <h3>Release Date</h3>
                <p>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <div className="detail-item">
                <h3>Language</h3>
                <p>{movie.original_language?.toUpperCase() || "N/A"}</p>
              </div>

              <div className="detail-item">
                <h3>Budget</h3>
                <p>
                  {movie.budget
                    ? `$${(movie.budget / 1000000).toFixed(1)}M`
                    : "N/A"}
                </p>
              </div>

              <div className="detail-item">
                <h3>Revenue</h3>
                <p>
                  {movie.revenue
                    ? `$${(movie.revenue / 1000000).toFixed(0)}M`
                    : "N/A"}
                </p>
              </div>

              <div className="detail-item">
                <h3>Popularity</h3>
                <p>{movie.popularity?.toFixed(0) || "N/A"}</p>
              </div>
            </div>
          </div>

          
          {cast.length > 0 && (
            <div className="cast-section">
              <h2>Cast</h2>
              <div className="cast-grid">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-card">
                    {actor.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                      />
                    )}
                    <div className="cast-info">
                      <h4>{actor.name}</h4>
                      <p>{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="error-container">
          <p>Movie not found</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetails;
