import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = () => (
  <Layout>
    <div className="container">
      <div className="columns">
        <div className="column is-one-sixth"> </div>
          <div className="column is-three-fifths"> 
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <h1 className="title"> Hi, I'm Prerit. </h1>
              </div>
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <p>
                  I currently live in Seattle and work at Microsoft. I grew up in Colorado and previously studied at CU Boulder and UIUC. 
                </p>
              </div>
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <p>
                  Things I find interesting:
                  <ul>
                    <li><b>Volunteering: </b>Microsoft TEALS volunteering at Pickney High School (based in Michigan)</li>
                    <li><b>Entrepreneurship: </b>Forver trying to launch and build various products</li>
                  </ul>
                </p>
              </div>
              <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                <p>
                  Contact:
                </p>
                <ul>
                    <li><b>Twitter: </b><a href="https://twitter.com/ThePreritOberai">@ThePreritOberai</a> </li>
                    <li><b>GitHub: </b><a href="https://github.com/PreritO">@PreritO</a></li>
                  </ul>
              </div>
          </div>
        <div className="column is-one-sixth"></div>
      </div>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
