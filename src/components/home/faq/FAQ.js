import React, { Component } from 'react'
// import Markdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'

class FAQ extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown:""
        }
      }

    componentDidMount() {
        const readmePath = require("./FAQ.md");
      
        fetch(readmePath)
          .then(response => {
            return response.text()
          })
          .then(text => {
            console.log(this.state.markdown)
            this.setState({
              markdown: text
            })
          })
      }

    render() {
      return(
        <main className="container">
            <Markdown>
                {this.state.markdown}
            </Markdown>
        </main>
      )
    }
}

export default FAQ