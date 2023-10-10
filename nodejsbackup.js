// In gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const allWpPostQuery = await graphql(`
      {        
        allWpPostDevelopment : allWpPost {
          edges {
            node {
              slug
            }
          }
        }
  
        allWpPostProduction : allWpPost(filter: {publishStatus: {status: {eq: "publish"}}}) {
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
  
    if (allWpPostQuery.errors) {
      throw allWpPostQuery.errors;
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
  
    // allWpPostQuery
    console.log("allWpPostDevelopment",allWpPostQuery.data.allWpPostDevelopment)
    console.log("allWpPostDevelopment",allWpPostQuery.data.allWpPostProduction)
     allWpPostQuery = process.env.NODE_ENV === 'development' ? allWpPostQuery.data.allWpPostDevelopment.edges : allWpPostQuery.data.allWpPostProduction.edges
  
  
  
  
     allWpPostQuery.forEach(({ node }) => {
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
  