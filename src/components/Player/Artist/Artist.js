import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDataLayerValue } from '../../../context/DataLayer';
import PlaylistItem from '../../UI/PlaylistItem/PlaylistItem';
import './Artist.css';

function Artist() {
  const { artistId } = useParams();
  const [{ spotify }] = useDataLayerValue();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistDetails, setArtistDetails] = useState(null);
  useEffect(() => {
    if (!spotify || !artistId) return;
    spotify.getArtist(artistId)
      .then(data => setArtistDetails(data.body))
      .catch(err => console.log("artist ==>", err))
    spotify.getArtistAlbums(artistId, { limit: 14 })
      .then(data => setArtistAlbums(data.body.items))
      .catch(err => console.log(err));
  }, [spotify, artistId]);

  return (
    <div className="artist">
      {artistDetails && <div className="artist__header">
        <img className="artist__headerImg" src={artistDetails.images[0].url} alt="" />
        <div className="artist__headerDet">
          <p>Artist</p>
          <p className="artist__headerName">{artistDetails.name}</p>
          <p className="artist__headerArtists">
            {artistDetails.followers.total} Followers
          </p>
        </div>
      </div>}

      {artistAlbums.length > 0 &&
        <div className="artist__section">
          <p className="artist__sectionHeading">Albums</p>
          {artistAlbums.map(album => (
            <Link style={{ textDecoration: "none" }} to={`/album/${album.id}`} key={album.id}>
              <PlaylistItem
                name={album.name}
                desc={album.artists.map(artist => artist.name).join(", ")}
                img={album.images[0]?.url}
              />
            </Link>
          ))}
        </div>}
    </div>
  )
}

export default Artist;
