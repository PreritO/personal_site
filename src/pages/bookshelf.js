import * as React from "react"
import { graphql, Link } from 'gatsby';
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BookshelfPage = ({data}) => {
    const {edges} = data.allMarkdownRemark;

    return ( 
        <Layout>
            <section className="section" style={{"paddingTop": "1rem"}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Bookshelf</title>
                </Helmet>
                <div className="container">
                    <div className="columns">
                        <div className="column is-one-sixth"> </div>
                        <div className="column is-three-fifths">  
                        <div style={{ margin: `0 auto`, textAlign: 'left'}}>
                            <h1 className="title"> Bookshelf </h1>
                        </div>
                        <div class="posts">
                            {edges.map(edge => {
                                const {frontmatter} = edge.node;
                                    return (
                                        <div class="box" key={frontmatter.path}>
                                            <div class="left">
                                                <Link to={frontmatter.path}>
                                                    <h4 style={{"text-align": "left", "margin-bottom": "-1rem"}}>{frontmatter.title}</h4>
                                                </Link>
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

export const Head = () => <Seo title="Prerit's Bookshelf" />

export const query = graphql`
    query BlogQuery {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {fileAbsolutePath: {regex: "/(bookshelf)/"  }}
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

export default BookshelfPage
