// In gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  let posts;
  process.env.NODE_ENV === 'development' ?
  posts = await graphql(`
    {        
      allWpPost{
        edges {
          node {
            slug
            publishStatus {
              status
            }
          }
        }
      }
    }
  `) : posts = await graphql(`
  {        
    allWpPost(filter: {publishStatus: {status: {eq: "publish"}}}) {
      edges {
        node {
          slug
          publishStatus {
            status
          }
        }
      }
    }
  }
`);

  if (posts.errors) {
    throw posts.errors;
  }


  const news = await graphql(`
  {        
    allWpNews {
      edges {
        node {
          slug
        }
      }
    }
  }
`);

if (news.errors) {
  throw news.errors;
}

  const postTemplate = require.resolve("./src/templates/post.js");
  const newsTemplate = require.resolve("./src/templates/news.js");

  posts.data.allWpPost.edges.forEach(({ node }) => {
    createPage({
      path: `post/${node.slug}`,
      component: postTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  news.data.allWpNews.edges.forEach(({ node }) => {
    createPage({
      path: `news/${node.slug}`,
      component: newsTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

};
