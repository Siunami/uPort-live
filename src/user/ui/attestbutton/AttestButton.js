import React from 'react'

const AttestButton = ({ onAttestUserClick }) => {
  return(
    <a href="#" className="pure-menu-link" onClick={(event) => onAttestUserClick(event)}>Attest</a>
  )
}

export default AttestButton
