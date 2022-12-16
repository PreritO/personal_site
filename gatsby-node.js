const path = require("path");

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {

    // Create blog posts
    const blogPostTemplate = path.resolve('src/layouts/posts.js');
    console.log(resolve)
    resolve (
      graphql(
        `
        query {
          allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/(blog-posts)/"  }}
          ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                  date
                }
              }
            }
          }
        }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
          const path = node.frontmatter.path;
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path
            }
          })

          resolve();
       });
      })
    )

    // Create book reviews
    const bookReviewTemplate = path.resolve('src/layouts/book-review.js');
    console.log(resolve)
    resolve (
      graphql(
        `
        query {
          allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/(bookshelf)/"  }}
          ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                  date
                }
              }
            }
          }
        }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
          const path = node.frontmatter.path;
          createPage({
            path,
            component: bookReviewTemplate,
            context: {
              pathSlug: path
            }
          })

          resolve();
       });
      })
    )

  });
});