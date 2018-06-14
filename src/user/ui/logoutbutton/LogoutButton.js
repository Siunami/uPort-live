import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <li className="menu-item">
      <a href="#" className="menu-link" onClick={(event) => onLogoutUserClick(event)}>Logout</a>
    </li>
  )
}

export default LogoutButton
