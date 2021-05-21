import React from 'react'
import './PlayerControls.css';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDataLayerValue } from '../../../context/DataLayer';
import * as actionTypes from '../../../context/actionTypes';

const PlayerControls = ({ uri }) => {
  const [{ token, playing }, dispatch] = useDataLayerValue();
  return (
    <div className="playerControls">
      {token && <SpotifyPlayer
        token={token}
        callback={state => {
          if (playing !== state.isPlaying) {
            dispatch({ type: actionTypes.SET_PLAYING, payload: state.isPlaying })
          }
        }}
        styles={{
          height: '60px',
          sliderColor: '#FFFFFF',
          sliderTrackColor: '#808080',
          sliderHandleColor: '#ffffff',
          trackArtistColor: '#ffffff',
          color: "#FFFFFF",
          bgColor: '#282828',
          trackNameColor: '#808080',
        }}
        play={playing}
        uris={uri}
      />}
    </div>
  )
}

export default PlayerControls
