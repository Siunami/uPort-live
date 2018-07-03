import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from './actions'

/**
 * Simple login component, accepts a click handler function, extra styles for the button
 * element, and children to display inside of the button
 */
export const LoginButton = ({ onLoginUserClick, style, children }) => {
  return (
    <div className="login-container menu-item">
  		<button href="#" className="login-button" 
        style={style} onClick={(event) => onLoginUserClick(event)}>
        {children}
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, {onClick = () => null}) => {
  return {
    onLoginUserClick: (event) => {
      event.preventDefault()
      dispatch(loginUser())
      onClick()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

