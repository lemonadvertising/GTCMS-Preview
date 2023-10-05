// In gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {        
      allWpPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const postTemplate = require.resolve("./src/templates/post.js");

  result.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: `${node.slug}`,
      component: postTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};
