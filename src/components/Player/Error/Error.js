import React from 'react'
import './Error.css';
import { redirectUri, spotifyLogoutURL } from '../../../spotify/spotify';


const logout = () => {
    const spotifyLogoutWindow = window.open(spotifyLogoutURL, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => {
      spotifyLogoutWindow.close();
      window.location.href = redirectUri;
    }, 2000)
  }

const Error = () => {
  return (
    <div className="error">
      <p>{"This user is not registered in the application. Please reach out to sameeryadav2421@gmail.com"}</p>
      <a onClick={logout}>LOGOUT</a>
    </div>
  )
}

export default Error