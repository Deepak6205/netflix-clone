import React, { useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {
  const cardsRef = useRef(null);

  const handleWheel = (e) => {
    cardsRef.current.scrollLeft += e.deltaY * 0.7;
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>

      <div
        className="card-list"
        ref={cardsRef}
        onWheel={handleWheel}
      >
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt="card-img" />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
