import React from "react";
import { graphql, Link } from 'gatsby';
import { Helmet } from "react-helmet"
import Header from '../components/Header';
import Essay from '../img/essays.svg'


const EssaysPage = ({data}) => {
    const {edges} = data.allMarkdownRemark;
    
    return (
        <section className="section" style={{"paddingTop": "1rem"}}>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Essays</title>
            </Helmet>
        <div className="container">
        <div className="columns">
            <div className="column is-one-sixth"> </div>
            <div className="column is-three-fifths">  
            <Header />
            <div class="level-item has-text-centered">
            <figure className="image is-128x128 is-inline-block">
                <img class="is-square" src={Essay} alt="Me"  />
            </figure>
          </div>
            <br /> 
            <h1 className="title"> Essays  </h1>
            <p>
                I'm hoping to write more about things that I find interesting. 
            </p>
            <br />
            <p style={{marginBottom: "0.5rem"}}><strong className="has-text-grey">All Posts</strong></p>
              {edges.map(edge => {
                const {frontmatter} = edge.node;
                return (
                  <div className="box" key={frontmatter.path} style={{color: "grey", marginBottom: "1rem"}}>
                    <span style={{fontSize: "0.75rem"}}>{frontmatter.date} </span> <br />
                    <Link to={frontmatter.path}>
                    <p>{frontmatter.title}</p>
                    </Link>
                    <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>{frontmatter.excerpt}</p>
                  </div>
                )
            })}

        </div>
        <div className="column is-one-sixth"></div>
        </div>
        </div>
    </section>
    );
}

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark (
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            path
            date
          }
        }
      }
    }
  }
`

export default EssaysPage
