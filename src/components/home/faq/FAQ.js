import React, { Component } from 'react'
// import Markdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'

class FAQ extends Component {
    render() {
        
      return(
        <main className="container">
            <Markdown>
                {"## Table"}
            </Markdown>
            <div className="row">
                <div className="column center aligned">
                    <p>FAQ</p>
                </div>
            </div>
            <div className="row">
                <div className="column center aligned">
                    <h1 className="banner-head">Create Proof of Attendence badges for your events with uPort Live</h1>
                </div>
            </div>
        </main>
      )
    }
}

export default FAQ