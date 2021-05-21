import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption/SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import { useDataLayerValue } from '../../../context/DataLayer';
import spotifyImg from '../../../assets/spotify.jpg'
import { Link, withRouter } from 'react-router-dom';
import { redirectUri, spotifyLogoutURL } from '../../../spotify/spotify';

function Sidebar(props) {
  const [{ spotify }] = useDataLayerValue();
  const [newReleases, setNewReleases] = useState([]);

  const logout = () => {
    const spotifyLogoutWindow = window.open(spotifyLogoutURL, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => {
      spotifyLogoutWindow.close();
      window.location.href = redirectUri;
    }, 2000)
  }

  useEffect(() => {
    if (!spotify) return;
    spotify.getNewReleases({ limit: 15, offset: 0, country: 'IN' })
      .then((data) => {
        setNewReleases(data.body.albums)
      }, (err) => {
        console.log("Something went wrong!", err);
      });
  }, [spotify]);

  return (
    <div className="sidebar">
      <img className="sidebar__logo"
        src={spotifyImg}
        alt=""
      />
      <Link style={{ textDecoration: 'none' }} to="/">
        <SidebarOption Icon={HomeIcon} title="Home" active={props.location.pathname === "/"} />
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/search">
        <SidebarOption Icon={SearchIcon} title="Search" active={props.location.pathname === "/search"} />
      </Link>
      <br />
      <strong className="sidebar__title">New Released Albums</strong>
      <div className="sidebar__hr" />
      <div className="sidebar__newReleases">
        {newReleases?.items?.map(newRelease => (
          <Link style={{ textDecoration: 'none' }} key={newRelease.id} to={`/album/${newRelease.id}`}>
            <SidebarOption title={newRelease.name} />
          </Link>
        ))}
      </div>
      <div className="sidebar__hr" />
      <div className="sidebar__logout" onClick={logout}>
        <SidebarOption Icon={PowerSettingsNewIcon} title="Logout" />
      </div>
    </div>
  )
}

export default withRouter(Sidebar);
