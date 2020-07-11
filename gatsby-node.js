const path = require("path");

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/layouts/posts.js');

    resolve (
      graphql(
        `
        query {
          allMarkdownRemark {
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
  });
})