import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../../context/DataLayer';
import SongRow from '../SongRow/SongRow';
import * as actionTypes from '../../../context/actionTypes';
import { useParams } from 'react-router';
import './Playlist.css';

function Playlist() {
  const { playlistId } = useParams();
  const [{ spotify }, dispatch] = useDataLayerValue();
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    if (!spotify || !playlistId) return;
    spotify.getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(err => console.log("artist ==>", err))
  }, [spotify, playlistId]);
  // console.log(playlist);

  return (
    <div className="playlist">
      {playlist && <div className="playlist__header">
        <img className="playlist__headerImg" src={playlist.images[0].url} alt="" />
        <div className="playlist__headerDet">
          <p>Playlist</p>
          <p className="playlist__headerName">{playlist.name}</p>
          <p className="playlist__headerDesc">
            {playlist.description}
          </p>
          <p className="playlist__headerPlaylists">
            {playlist.followers.total} Followers
          </p>
        </div>
      </div>}
      {playlist && <div className="playlist__songs">
        {playlist.tracks.items.map((item, index) => (
          <SongRow
            trackId={item.track.id}
            playSong={() => {
              dispatch({ type: actionTypes.SET_URI, payload: item.track.uri });
              dispatch({ type: actionTypes.SET_PLAYING, payload: true })
            }}
            trackName={item.track.name}
            artistsName={item.track.artists.map(artist => artist.name).join(", ")}
            imgUrl={item.track.album.images[0].url}
            albumName={item.track.album.name}
            key={index} />
        ))}
      </div>}
    </div>
  )
}

export default Playlist
