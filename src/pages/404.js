import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Four0Four from "../images/404.jpeg" 

const NotFoundPage = () => (
  <Layout>
   <div className="container">
      <div className="columns">
        <div className="column is-one-sixth"> </div>
          <div className="column is-three-fifths"> 
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <h1 className="title"> 404: Not Found </h1>
              </div>
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <img src={Four0Four} alt="404"  />
                <p>Image credits to: <a href="https://unsplash.com/@etiennegirardet">Etienne Girardet</a></p>
              </div>
          </div>
        <div className="column is-one-sixth"></div>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
