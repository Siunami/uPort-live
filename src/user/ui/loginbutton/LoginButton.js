import React from 'react'

// Images
import uPortLogo from '../../../img/uport-logo.svg'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <div>
      {/* Login with uPort image */}
      {/* <button href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}><img className="uport-logo" src={uPortLogo} alt="UPort Logo" /></button> */}
      <button href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}>Login</button>
    </div>
  )
}

export default LoginButton
