import * as React from "react"
import '../styles/layout.css'

const Header = () => (
  <div style={{marginTop: "1rem", marginBottom: "2rem"}}>
    <div style={{ textAlign: "left"}}>
      <nav>
        <a href="/" class="button is-link" style={{marginTop: "1em"}}> Home </a>
        <a href="/posts" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}> Posts</a>
        <a href="/bookshelf" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}> Bookshelf</a>
        <a href="https://twitter.com/ThePreritOberai" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}> Twitter</a>
        {/* <a href="/projects" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}>Projects</a> */}
      </nav>
    </div>
  </div>
)

export default Header
