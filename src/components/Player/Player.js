import React, { useEffect, useState } from 'react'
import './Player.css';
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body';
import useAuth from './../../hooks/useAuth';
import * as actionTypes from './../../context/actionTypes';

import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../../context/DataLayer';
import PlayerControls from './PlayerControls/PlayerControls';
import Err from './Error/Error';


const spotifyApi = new SpotifyWebApi({
  clientId: "25c4582018f14ff8ad9c57698a4d43d0",
});

const Player = ({ code }) => {
  const accessToken = useAuth(code);
  const [{ uri }, dispatch] = useDataLayerValue();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken);

    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: accessToken });
    dispatch({ type: actionTypes.SET_SPOTIFY, payload: spotifyApi });

    setLoading(true);
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((data) => {
      if (data.status === 403) {
        setError(true);
        throw new Error();
      } else {
        return spotifyApi.getMe();
      }
    })
      .then(data => {
        dispatch({ type: actionTypes.SET_USER, payload: data.body });
      })
      .catch((err) => {
        setError(true);
        console.log("fetch", err)
      })
      .finally(() => {
        setLoading(false);
      })

  }, [accessToken, dispatch]);

  return loading ? "Loading" : error ? <Err/> : <div className="player"><div className="player__body"><Sidebar /><Body /></div><PlayerControls uri={uri} /></div>
}

export default Player
