import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDataLayerValue } from '../../../context/DataLayer';
import SongRow from '../SongRow/SongRow';
import * as actionTypes from '../../../context/actionTypes';
import './Album.css';

function Album() {
  const { albumId } = useParams();
  const [{ spotify }, dispatch] = useDataLayerValue();
  const [albumDetails, setAlbumDetails] = useState(null);
  useEffect(() => {
    if (!spotify || !albumId) return;
    spotify.getAlbum(albumId)
      .then(data => {
        setAlbumDetails(data.body)
      }, err => {
        console.error(err);
      });
  }, [spotify, albumId]);
  return (
    albumDetails && <div className="album">
      <div className="album__header">
        <img className="album__headerImg" src={albumDetails.images[0].url} alt="" />
        <div className="album__headerDet">
          <p>Album</p>
          <p className="album__headerName">{albumDetails.name}</p>
          <p className="album__headerArtists">
            {albumDetails.artists.map(artist => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="album__songs">
        {albumDetails.tracks.items.map((item) => (
          <SongRow
            trackId={item.id}
            playSong={() => {
              dispatch({ type: actionTypes.SET_URI, payload: item.uri });
              dispatch({ type: actionTypes.SET_PLAYING, payload: true })
            }}
            trackName={item.name}
            artistsName={item.artists.map(artist => artist.name).join(", ")}
            isAlbum
            key={item.uri} />
        ))}
      </div>
    </div>
  )
}

export default Album;
