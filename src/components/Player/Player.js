import React, { useEffect } from 'react'
import './Player.css';
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body';
import useAuth from './../../hooks/useAuth';
import * as actionTypes from './../../context/actionTypes';

import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../../context/DataLayer';
import PlayerControls from './PlayerControls/PlayerControls';


const spotifyApi = new SpotifyWebApi({
  clientId: "25c4582018f14ff8ad9c57698a4d43d0",
});

const Player = ({ code }) => {
  const accessToken = useAuth(code);
  const [{ uri }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken);

    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: accessToken });
    dispatch({ type: actionTypes.SET_SPOTIFY, payload: spotifyApi });

    spotifyApi.getMe()
      .then(data => {
        dispatch({ type: actionTypes.SET_USER, payload: data.body });
      }).catch(err => console.log("getme ==>", err));

  }, [accessToken, dispatch]);

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body />
      </div>
      <PlayerControls uri={uri} />
    </div>
  )
}

export default Player
