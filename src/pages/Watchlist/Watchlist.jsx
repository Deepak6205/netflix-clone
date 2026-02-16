import React, { useState } from "react";
import "./Watchlist.css";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("recent");

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.vote_average || 0) - (a.vote_average || 0);
    }
    return 0;
  });

  return (
    <div className="watchlist-page">
      <Navbar />

      <div className="watchlist-container">
        <div className="watchlist-header">
          <h1>My List</h1>
          <p className="count">
            {watchlist.length} {watchlist.length === 1 ? "item" : "items"}
          </p>
        </div>

        {watchlist.length > 0 ? (
          <>
            <div className="watchlist-controls">
              <div className="sort-group">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="watchlist-grid">
              {sortedWatchlist.map((movie) => (
                <div key={movie.id} className="watchlist-card">
                  {movie.backdrop_path && (
                    <div
                      className="card-image"
                      onClick={() => navigate(`/player/${movie.id}`)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <div className="card-overlay">
                        <button className="play-btn">▶ Watch</button>
                      </div>
                    </div>
                  )}

                  <div className="card-content">
                    <h3>{movie.title}</h3>
                    {movie.vote_average && (
                      <div className="card-rating">
                        <span className="stars">⭐ {movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                    <p className="card-overview">
                      {movie.overview?.substring(0, 100)}...
                    </p>
                    <div className="card-actions">
                      <button
                        className="btn-watch"
                        onClick={() => navigate(`/player/${movie.id}`)}
                      >
                        Watch
                      </button>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromWatchlist(movie.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📺</div>
            <h2>Your List is Empty</h2>
            <p>Add movies to your list to save them for later</p>
            <button
              className="btn-explore"
              onClick={() => navigate("/")}
            >
              Explore Movies
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
