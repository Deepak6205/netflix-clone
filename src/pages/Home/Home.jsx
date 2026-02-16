import React, { useEffect, useState } from "react";
import "./Home.css";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const typeParam = searchParams.get("type");
  const langParam = searchParams.get("lang");

  // if type param is provided (e.g., tv), map to category
  const effectiveCategory = categoryParam || (typeParam === 'tv' ? 'tv_popular' : null);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results || []);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error(err);
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  if (searchQuery) {
    return (
      <>
        <Navbar />
        <div className="search-results-page">
          <div className="search-header">
            <h1>Search Results for "{searchQuery}"</h1>
            <p className="results-count">
              Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
            </p>
          </div>

          {isSearching ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="search-grid">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="search-card"
                  onClick={() => navigate(`/player/${movie.id}`)}
                >
                  {movie.backdrop_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                  )}
                  <div className="search-card-content">
                    <h3>{movie.title}</h3>
                    <p className="rating">⭐ {movie.vote_average?.toFixed(1)}</p>
                    <p className="overview">{movie.overview?.substring(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No results found for "{searchQuery}"</p>
              <button onClick={() => window.history.back()}>Go Back</button>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }

  // If a category is requested, render a focused category page
  if (effectiveCategory && !searchQuery) {
    const titleMap = {
      popular: 'Popular Movies',
      top_rated: 'Blockbuster Movies',
      upcoming: 'New Releases',
      trending: 'Trending Now',
      tv_popular: 'Popular TV Shows',
      tv_top_rated: 'Top Rated TV Shows',
    };
    const title = titleMap[effectiveCategory] || 'Category';

    return (
      <>
        <Navbar />
        <div className="category-page" style={{ padding: '80px 40px' }}>
          <h1 style={{ marginBottom: 20 }}>{title}</h1>
          <TitleCards title={title} category={effectiveCategory} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="title" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order. A young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="play-icon" />
              Play
            </button>

            <button className="btn dark-btn">
              <img src={info_icon} alt="info-icon" />
              More Info
            </button>
          </div>
          <TitleCards title="Now Playing" />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards title="Popular Movies" category="popular" />
        <TitleCards title="New Releases" category="upcoming" />
        <TitleCards title="Trending Now" category="trending" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
