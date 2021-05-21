import React from 'react'
import './Body.css';
import Header from '../Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Album from '../Album/Album';
import Playlist from '../Playlist/Playlist';
import Artist from '../Artist/Artist';
import Home from '../Home/Home';
import Search from '../Search/Search';

const Body = () => {

  return (
    <div className="body">
      <Header />
      <Switch>
        <Route path="/album/:albumId" exact component={Album} />
        <Route path="/artist/:artistId" exact component={Artist} />
        <Route path="/playlist/:playlistId" exact component={Playlist} />
        <Route path="/search" exact component={Search} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default Body
