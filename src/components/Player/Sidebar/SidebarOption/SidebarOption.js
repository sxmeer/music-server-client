import React from 'react'
import './SidebarOption.css'

function SidebarOption({ title, Icon, active }) {
  return (
    <div className={`sidebarOption ${active ? "sidebarOption__active" : ""}`}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SidebarOption