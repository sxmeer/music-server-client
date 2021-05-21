import React from 'react';
import './ArtistItem.css';

const ArtistItem = ({ img, name, desc }) => {
  return (
    <div className="artistItem">
      <img className="artistItem__img" src={img} alt="" />
      <div className="artistItem__detail">
        <p className="artistItem__name">{name}</p>
        <p className="artistItem__desc">{desc}</p>
      </div>
    </div>
  )
}

export default ArtistItem;
