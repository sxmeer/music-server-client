import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../../context/DataLayer';
import './Search.css';
import { Link } from 'react-router-dom';
import PlaylistItem from '../../UI/PlaylistItem/PlaylistItem';
import ArtistItem from '../../UI/ArtistItem/ArtistItem';
import * as actionTypes from '../../../context/actionTypes';
import dummyUser from '../../../assets/user.svg';

function Search() {

  const [{ spotify, searchString }, dispatch] = useDataLayerValue();
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  console.log(artists);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_SEARCH_MODE, payload: true })
    return () => {
      dispatch({ type: actionTypes.SET_SEARCH_MODE, payload: false })
    }
  }, [dispatch]);

  useEffect(() => {
    if (!searchString) {
      setArtists([]);
      setPlaylists([]);
      setAlbums([]);
      return;
    }
    let cancel = false;
    spotify.searchPlaylists(searchString, { limit: 14 })
      .then(data => {
        if (cancel) return;
        let fetchedPlaylists = data.body.playlists.items
        setPlaylists(fetchedPlaylists);
      }, err => {
        console.log('Something went wrong!', err);
      });

    spotify.searchTracks(`album:${searchString}`, { limit: 40 })
      .then(data => {
        if (cancel) return;
        let fetchedAlbums = data.body.tracks.items.filter(item => item.album.album_type === "album");
        // let fetchedAlbums = data.body.tracks.items;
        setAlbums(fetchedAlbums);
      }, err => {
        console.error(err);
      });

    spotify.searchArtists(searchString, { limit: 14 })
      .then(data => {
        if (cancel) return;
        let fetchedArtists = data.body.artists.items;
        setArtists(fetchedArtists);
      }, err => {
        console.error(err);
      });
    return () => (cancel = true)
  }, [searchString, spotify]);

  return (
    <div className="search">
      {!searchString ?
        <h2>Please enter something to search...</h2> :
        artists.length === 0 && albums.length === 0 && playlists.length === 0 ?
          <h2>No Search Results</h2> :
          <div className="search__results">
            {playlists.length > 0 &&
              <div className="search__section">
                <p className="search__sectionHeading">Playlists</p>
                {playlists.map(playlist => (
                  <Link style={{ textDecoration: "none" }} to={`/playlist/${playlist.id}`} key={playlist.id}>
                    <PlaylistItem
                      name={playlist.name}
                      desc={playlist.description}
                      img={playlist.images.length > 0 ? playlist.images[0].url : dummyUser}
                    />
                  </Link>
                ))}
              </div>}

            {artists.length > 0 &&
              <div className="search__section">
                <p className="search__sectionHeading">Artists</p>
                {artists.map(artist => (
                  <Link style={{ textDecoration: "none" }} to={`/artist/${artist.id}`} key={artist.id}>
                    <ArtistItem
                      name={artist.name}
                      desc="Artist"
                      img={artist.images.length > 0 ? artist.images[0].url : dummyUser}
                    />
                  </Link>
                ))}
              </div>}

            {albums.length > 0 &&
              <div className="search__section">
                <p className="search__sectionHeading">Albums</p>
                {albums.map(album => (
                  <Link style={{ textDecoration: "none" }} to={`/album/${album.album.id}`} key={album.id}>
                    <PlaylistItem
                      name={album.album.name}
                      desc={album.album.artists.map(artist => artist.name).join(", ")}
                      img={album.album.images.length > 0 ? album.album.images[0].url : dummyUser}
                    />
                  </Link>
                ))}
              </div>}
          </div>
      }
    </div >
  )
}

export default Search;
