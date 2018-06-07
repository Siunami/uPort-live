import React, { Component } from 'react'
import { uport, credentials } from './../../../util/connectors.js'



class Attest extends Component {
    attest(){
      // credentials.createRequest({
      //   verified: ['Ethereal Summit Conference']
      // }).then(data => {
      //   console.log(data);
      // })
      uport.requestCredentials().then((credentials) => {
          // FUTURE TODO: Check credentials with event database before offering attestation.
          // OR: Request an attestation from user for login.
          var d = new Date();
          var month = ['Jan', 'Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov', 'Dec'];
          // Attest specific credentials
          uport.attestCredentials({
            sub: credentials.address,
            claim: {
              "Event": "Ethereal Summit Conference",
              "Date": month[d.getMonth()] + " " + d.getDate() + "," + d.getFullYear(),
              "Details": "Proof of Attendance"
            }
          })
        })
    }

    render(){
        return(
            <button href="#" className="pure-menu-link" onClick={this.attest}>Attest</button>
          )
    }
}

export default Attest;