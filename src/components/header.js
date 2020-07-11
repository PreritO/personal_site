import React from "react"

import '../styles/styles.sass'

const Header = () => {
  return (
    <div style={{marginTop: "1rem", marginBottom: "2rem"}}>
      <div class="level-item has-text-centered">
        <nav>
          <a href="/" class="button is-link" style={{marginTop: "1em"}}> Home </a>
          <a href="/research" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}> Research</a>
          <a href="/teaching" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}>Teaching</a>
          <a href="/essays" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}>Essays</a>
          {/* <a href="/projects" class="button is-link" style={{marginLeft: "1em", marginTop: "1em"}}>Projects</a> */}
        </nav>
      </div>
    </div>
  )
}

export default Header
