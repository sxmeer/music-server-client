import React from 'react'
import './Login.css';
import { loginUrl } from '../../spotify/spotify'
import imageUrl from '../../assets/spotify.jpg'

function Login() {
  return (
    <div className="login">
      <img
        src={imageUrl}
        alt=""
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
