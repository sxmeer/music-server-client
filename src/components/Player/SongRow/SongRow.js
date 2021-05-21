import React from 'react'
import './SongRow.css'
function SongRow({ trackId, playSong, trackName, artistsName, isAlbum, imgUrl, albumName }) {
  return (
    <div className="songRow" onClick={() => playSong(trackId)}>
      {!isAlbum && <img className="songRow__album"
        src={imgUrl}
        alt=""
      />}
      <div className="songRow__info">
        <h1>{trackName}</h1>
        <p>
          {artistsName}
          {!isAlbum && `; Album: ${albumName}`}
        </p>
      </div>
    </div>
  )
}

export default SongRow
