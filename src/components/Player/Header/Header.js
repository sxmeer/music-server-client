import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from '../../../context/DataLayer';
import * as actionTypes from '../../../context/actionTypes';

function Header() {
  const [{ user, searchMode, searchString }, dispatch] = useDataLayerValue();
  return (
    <div className="header">
      <div className="header__left" style={{ background: searchMode ? 'white' : 'transparent' }}>
        <SearchIcon style={{ display: searchMode ? 'block' : 'none' }} />
        <input
          value={searchString}
          onChange={(e) => dispatch({ type: actionTypes.SET_SEARCH_STRING, payload: e.target.value })}
          style={{ display: searchMode ? 'block' : 'none' }}
          placeholder="Search for Artist, Albums or Playlists..."
          type="text" />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <p>{user?.display_name}</p>
      </div>
    </div>
  )
}

export default Header
