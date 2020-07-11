import React from "react"
import Header from '../components/Header'
import { Helmet } from "react-helmet"
import Me from "../img/me.png"


const IndexPage = () => {
  return (
    <section className="section" style={{"paddingTop": "1rem"}}>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Prerit Oberai</title>
        </Helmet>
    <div className="container">
      <div className="columns">
        <div className="column is-one-sixth"> </div>
        <div className="column is-three-fifths">  
          <Header />
          <div class="level-item has-text-centered">
            <figure className="image is-128x128 is-inline-block">
                <img class="is-rounded" src={Me} alt="Me"  />
            </figure>
          </div>
          <h1 className="title"> Hi, I'm Prerit.  </h1>
          <p>
            I'm a graduate student at the University of Illinois at Urbana-Champaign studying computer engineering.
            I am interested in building scalable infrastructure for applications in data centers, focusing on both the hardware and software stack.
            <br /> 
            <br />

            I recently received my Masters in Electrical Engineering from University of Colorado - Boulder, 
            where I chose to focus on Network and Embedded Systems under the guidance and mentorship of Professor Eric Keller. 
            <br />
            <br />

            Outside of academia, you can find me hiking, playing soccer or binging something on Netflix. 
            I'm also hoping to write more regarding my research, experiences in my life and anything else that I find interesting so be sure to 
            check back often (if you want). 
          </p>
          <br />
          <br />
          <h2 className="title"> Let's Connect! </h2>
          <p>
          There are multiple ways to reach out to me if you’re interested in contacting me but the easist way is 
          <a href="https://twitter.com/ThePreritOberai"> Twitter</a>.
          <br />
          <br />
          I also have a  <a href="https://linkedin.com/in/preritoberai">LinkedIn</a> but don’t check it as often. 
          <br />
          <br />
          Finally, if you're interested in a book exchange, you can find me on <a href="https://read.gift/u/thepreritoberai"> read.gift</a>.
          </p>
          
        </div>
        <div className="column is-one-sixth"></div>
      </div>
    </div>
</section>
  );
}

export default IndexPage
