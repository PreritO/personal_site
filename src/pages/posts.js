import * as React from "react"
import { graphql, Link } from 'gatsby';
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PostsPage = ({data}) => {

    const {edges} = data.allMarkdownRemark;

    return ( 
        <Layout>
            <section className="section" style={{"paddingTop": "1rem"}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Posts</title>
                </Helmet>
                <div className="container">
                    <div className="columns">
                        <div className="column is-one-sixth"> </div>
                        <div className="column is-three-fifths">  
                        <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                            <h1 className="title"> Posts </h1>
                        </div>
                        <div class="posts">
                            {edges.map(edge => {
                                const {frontmatter} = edge.node;
                                    return (
                                        <div class="box" key={frontmatter.path} style={{"marginBottom": "-2em"}}>
                                            <div class="left">
                                                <Link to={frontmatter.path}>
                                                    <h4 style={{"text-align": "left", "margin-bottom": "-1rem"}}>{frontmatter.title}</h4>
                                                </Link>
                                            </div>
                                            <div class="date">
                                                <h6>{frontmatter.date}</h6>
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                        </div>
                        <div className="column is-one-sixth"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const Head = () => <Seo title="Prerit's Essays" />

export const query = graphql`
    query BlogQuery {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {fileAbsolutePath: {regex: "/(blog-posts)/"  }}
            ) {
            edges {
                node {
                    frontmatter {
                        title
                        excerpt
                        path
                        date(formatString: "LL")
                    }
                }
            }
        }
    }
`

export default PostsPage
