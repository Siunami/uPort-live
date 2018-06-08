import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'

// import { uport } from '../../util/connectors'

class AttestGenerator extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      var target = event.target;
      var name = target.name;
      this.setState({[name]: target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    // TODO: Issuer and image for attestation happens in appmanager.
    // Need to create a new app for every 
    // https://github.com/uport-project/appmanager-cli/blob/master/manager.js
    // TODO: Check to make sure all fields have been filled
    const uport = new Connect('uPort Live', {
        clientId: '2p2BR9kv8xPPiNFL7bHUZXg4idyUYfaCwfg',
        network: 'rinkeby',
        signer: SimpleSigner('cee5a66435456e057bc58e9cf6a7a83a4d40f826744975a059ec6da8610f16df')
      })
    // FUTURE TODO: Check credentials with event database before offering attestation.
    // OR: Request an attestation from user for login.
    var d = new Date();
    var month = ['Jan', 'Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov', 'Dec'];
    uport.attestCredentials({
        sub: this.props.authData.address,
        claim: {
        "Event": this.state.eventName,
        "Issued": month[d.getMonth()] + " " + d.getDate() + "," + d.getFullYear(),
        "Location": this.state.address + ", " + this.state.city + ", " + this.state.state + ", " + this.state.zip + " " + this.state.country,
        "Event Start": this.state.eventStart,
        "Event End": this.state.eventEnd,
        "Details": "Proof of Attendance"
        }
    })
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Attest</h1>

            <form className="ui form" onSubmit={this.handleSubmit}>
                <h4 className="ui dividing header">Attestation Generator</h4>
                <div className="field">
                    <label>Event Name</label>
                    <input type="text" name="eventName" value={this.state.value} onChange={this.handleChange} placeholder="Event Name"/>
                </div>
                <div className="field">
                    <label>About</label>
                    <input type="text" name="about" value={this.state.value} onChange={this.handleChange} placeholder="About"/>
                </div>
                <div className="field">
                    <label>Event Location</label>
                    <div className="fields">
                        <div className="field">
                            <input type="text" name="address" value={this.state.value} onChange={this.handleChange} placeholder="Street Address"/>
                        </div>
                        <div className="field">
                            <input type="text" name="city" value={this.state.value} onChange={this.handleChange} placeholder="City"/>
                        </div>
                        <div className="field">
                            <input type="text" name="state" value={this.state.value} onChange={this.handleChange} placeholder="State"/>
                        </div>
                        <div className="field">
                            <input type="text" name="zip" value={this.state.value} onChange={this.handleChange} placeholder="Zip Code"/>
                        </div>
                        <div className="field">
                            <input type="text" name="country" value={this.state.value} onChange={this.handleChange} placeholder="Country"/>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Event Dates</label>
                    <div className="fields">
                        <div className="field">
                            <input type="text" name="eventStart" value={this.state.value} onChange={this.handleChange} placeholder="Event Start Date"/>
                        </div>
                        <div className="field">
                            <input type="text" name="eventEnd" value={this.state.value} onChange={this.handleChange} placeholder="Event End Date"/>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default AttestGenerator
