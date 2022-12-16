import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"

const BookReviewPage = ({data}) => {
    const {markdownRemark} = data
    const html = markdownRemark.html
    const title = markdownRemark.frontmatter.title
    
    return (
      <Layout>
        <div className="container">
      <div className="columns">
        <div className="column is-one-sixth"> </div>
          <div className="column is-three-fifths"> 
            
            <div class="box" style={{"justifyContent": "space-between", "marginBottom": "-1em"}}>
              <div class="left" style={{"float": "left"}}>
                <h1 class="title">{title}</h1>
              </div>
            </div>
            <div className="generated">
               <div style={{marginTop: "1rem", textAlign: "left"}} dangerouslySetInnerHTML={{__html: html}}/>
            </div>
          </div>
        <div className="column is-one-sixth"></div>
      </div>
    </div>
      </Layout>
    )
  }
  
  export const query = graphql`
    query($pathSlug: String!) {
      markdownRemark(frontmatter: { path: {eq: $pathSlug }}) {
        rawMarkdownBody
        html
        frontmatter {
          title
          date
        }
      }
    }
  `
  
  export default BookReviewPage;