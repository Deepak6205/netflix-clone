import React from "react";
import "./home.css";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
const Home = () => {
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
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"}/>
        <TitleCards title={"Popular TV Shows"}/>
        <TitleCards title={"New Releases"}/>
        <TitleCards title={"Trending Now"}/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
