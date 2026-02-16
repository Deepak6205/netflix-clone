import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { user, logout, watchlist } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.style.background = "rgba(0,0,0,0.8)";
      } else {
        navRef.current.style.background = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery("");
      setIsSearchActive(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }} />
        <ul className="nav-items">
          <li onClick={() => { setMobileOpen(false); navigate('/'); }}>Home</li>
          <li onClick={() => { setMobileOpen(false); navigate('/?category=tv_popular'); }}>TV Shows</li>
          <li onClick={() => { setMobileOpen(false); navigate('/?category=popular'); }}>Movies</li>
          <li onClick={() => { setMobileOpen(false); navigate('/?category=popular'); }}>New & Popular</li>
          <li onClick={() => { setMobileOpen(false); navigate('/watchlist'); }}>My List ({watchlist.length})</li>
          <li className="language-item" onMouseEnter={() => setShowLanguages(true)} onMouseLeave={() => setShowLanguages(false)}>
            Browse by Language
            {showLanguages && (
              <div className="language-dropdown">
                <p onClick={() => { setMobileOpen(false); navigate('/?lang=en'); }}>English</p>
                <p onClick={() => { setMobileOpen(false); navigate('/?lang=hi'); }}>Hindi</p>
                <p onClick={() => { setMobileOpen(false); navigate('/?lang=es'); }}>Spanish</p>
              </div>
            )}
          </li>
        </ul>

        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="navbar-right">
        <div className={`search-box ${isSearchActive ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
          />
          <img 
            src={search_icon} 
            alt="search" 
            className="search-icon"
            onClick={() => setIsSearchActive(!isSearchActive)}
          />
        </div>

        <p className="children-mode">Children</p>
        <img src={bell_icon} alt="bell" className="icons" />

        <div className="navbar-profile">
          <img
            src={profile_img}
            alt="profile"
            className="profile"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: "pointer" }}
          />
          <img
            src={caret_icon}
            alt="caret"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: "pointer" }}
          />
          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-header">
                <p>{user?.name}</p>
                <small>{user?.email}</small>
              </div>
              <hr />
              <p onClick={() => navigate("/watchlist")}>My List</p>
              <p>Account Settings</p>
              <p>Profile</p>
              <hr />
              <p onClick={handleLogout} className="logout">
                Sign out of Netflix
              </p>
            </div>
          )}
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <ul>
              <li onClick={() => { setMobileOpen(false); navigate('/'); }}>Home</li>
              <li onClick={() => { setMobileOpen(false); navigate('/?category=tv_popular'); }}>TV Shows</li>
              <li onClick={() => { setMobileOpen(false); navigate('/?category=popular'); }}>Movies</li>
              <li onClick={() => { setMobileOpen(false); navigate('/?category=popular'); }}>New & Popular</li>
              <li onClick={() => { setMobileOpen(false); navigate('/watchlist'); }}>My List ({watchlist.length})</li>
              <li onClick={() => { setMobileOpen(false); setShowLanguages(true); }}>Browse by Language</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
