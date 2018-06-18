import React from 'react'

/**
 * Simple login component, accepts a click handler function, extra styles for the button
 * element, and children to display inside of the button
 */
const LoginButton = ({ onLoginUserClick, style, children }) => {
  return (
    <div className="login-container menu-item">
  		<button href="#" className="login-button" 
        style={style} onClick={(event) => onLoginUserClick(event)}>
        {children}
      </button>
    </div>
  )
}

export default LoginButton
