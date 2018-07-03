import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'

import about from '../../../../about.md'

class About extends Component {
  render() {
    return (
      <main className="container">
      <div className="fullpage" style={{textAlign: 'left'}}>
        <Markdown>
          {about}
        </Markdown>
      </div>
    </main>
    )}
}

export default About
