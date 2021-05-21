import React from 'react';
import './PlaylistItem.css';

const PlaylistItem = ({ img, name, desc }) => {
  return (
    <div className="playlistItem">
      <img className="playlistItem__img" src={img} alt="" />
      <div className="playlistItem__detail">
        <p className="playlistItem__name">{name}</p>
        <p className="playlistItem__desc">{desc}</p>
      </div>
    </div>
  )
}

export default PlaylistItem;
