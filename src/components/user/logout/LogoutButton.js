import React from 'react'
import { connect } from 'react-redux'

import { logoutUser } from './actions'

export const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <li className="menu-item">
      <a href="#" className="menu-link" onClick={(event) => onLogoutUserClick(event)}>Logout</a>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();

      dispatch(logoutUser())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)
