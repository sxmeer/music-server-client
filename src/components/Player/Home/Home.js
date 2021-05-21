import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../../context/DataLayer';
import PlaylistItem from '../../UI/PlaylistItem/PlaylistItem';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [{ spotify }] = useDataLayerValue();
  const [recentlyAccessedAlbums, setRecentlyAccessedAlbums] = useState([]);

  useEffect(() => {
    if (!spotify) return;
    spotify.getMyRecentlyPlayedTracks({ limit: 25 }).then(data => {
      // let recentlyPlayedAlbums = data.body.items.filter(item => item.track.album.type === "album");
      setRecentlyAccessedAlbums(data.body.items);
    }, err => {
      console.log('Something went wrong!', err);
    });
  }, [spotify]);

  return <div className="home">
    <h1>Recently Accessed Albums...</h1>
    <div className="home__albums">
      {recentlyAccessedAlbums.map(item => {
        return (
          <Link style={{ textDecoration: 'none' }} to={`/album/${item.track.album.id}`} key={item.played_at}>
            <PlaylistItem
              name={item.track.album.name}
              desc={item.track.album.artists.map(artist => artist.name).join(", ")}
              img={item.track.album.images[0].url} />
          </Link>
        )
      })}
    </div>
  </div>
}

export default Home;
