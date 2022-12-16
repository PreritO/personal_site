import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"

const PostPage = ({data}) => {
    const {markdownRemark} = data
    const html = markdownRemark.html
    const date = markdownRemark.frontmatter.date
    const title = markdownRemark.frontmatter.title
    
    return (
      <Layout>
        <div className="container">
      <div className="columns">
        <div className="column is-one-sixth"> </div>
          <div className="column is-three-fifths"> 
            
            <div class="box" style={{"justifyContent": "space-between"}}>
              <div class="left" style={{"float": "left"}}>
                <h1 class="title">{title}</h1>
              </div>
              <div class="date-post">
                <h6 style={{"font-style": "normal" }}>{date}</h6>
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
  
  export default PostPage;