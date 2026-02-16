import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let url = "";

    // support tv_ prefixed categories to fetch TV endpoints
    if (category && category.startsWith("tv_")) {
      const tvEndpoint = category.slice(3);
      if (tvEndpoint === "trending") {
        url = "https://api.themoviedb.org/3/trending/tv/week";
      } else {
        url = `https://api.themoviedb.org/3/tv/${tvEndpoint}?language=en-US&page=1`;
      }
    } else {
      if (category === "trending") {
        url = "https://api.themoviedb.org/3/trending/movie/week";
      } else {
        url = `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`;
      }
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, [category]);

  

  
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.2;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel, { passive: false });
  }, []);

  
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    let isTouching = false;
    let startX = 0;
    let startScroll = 0;

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      isTouching = true;
      startX = e.touches[0].clientX;
      startScroll = el.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!isTouching || !e.touches || e.touches.length === 0) return;
      const x = e.touches[0].clientX;
      const dx = x - startX;
      
      if (Math.abs(dx) > 6) e.preventDefault();
      el.scrollLeft = startScroll - dx;
    };

    const onTouchEnd = () => {
      isTouching = false;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  if (error) {
    return (
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <div className={`card-list ${isLoading ? "loading" : ""}`} ref={cardsRef}>
        {isLoading ? (
          <div className="skeleton-loader">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        ) : apiData.length > 0 ? (
          apiData.map((card) => (
            <Link
              to={`/player/${card.id}`}
              className="card"
              key={card.id}
              title={card.original_title || card.title}
            >
              {card.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title || card.title}
                />
              )}
              <div className="card-overlay">
                <button className="play-btn">▶ Watch</button>
              </div>
              <p className="card-title">{card.original_title || card.title}</p>
            </Link>
          ))
        ) : (
          <div className="no-content">
            <p>No content available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
