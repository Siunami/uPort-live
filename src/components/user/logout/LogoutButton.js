import React from 'react'
import { connect } from 'react-redux'

import { logoutUser } from './actions'

export const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <div className="logout-container menu-item">
      <button href="#" className="logout-button" onClick={(event) => onLogoutUserClick(event)}>logout</button>
    </div>
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
