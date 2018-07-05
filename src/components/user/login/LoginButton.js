import React from 'react'
import { browserHistory } from 'react-router'

/**
 * Simple login component, accepts a click handler function, extra styles for the button
 * element, and children to display inside of the button
 */
const LoginButton = ({ onLoginUserClick, style, children }) => {
  const currentLocation = browserHistory.getCurrentLocation()

  return (
    <div className="login-container menu-item">
  		<button href="#" className="login-button" style={style} 
        onClick={() => browserHistory.push(currentLocation.pathname + '?login')}>
        {children}
      </button>
    </div>
  )
}

export default LoginButton