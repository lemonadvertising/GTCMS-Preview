import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layouts";
const PostTemplate = ({ data }) => {
  const post = data.wpPost;


  return (
    <Layout>
    <div className="container">
      <h1>{post.title}</h1>
      

   
        <div className="row">
            <div className="col-md-6">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="col-md-6">
            <GatsbyImage
              image={post.featuredImage.node.gatsbyImage}    
            />
                </div>
       
      </div>
    </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      title
      content
      featuredImage {
        node {
          gatsbyImage(width: 720)
        }
      }
    }
  }
`;

export default PostTemplate;





// const isDevelopment = process.env.NODE_ENV === 'development';

// const query = isDevelopment ? 
//   `
//   query {
//     allWpPost(filter: {status: {eq: "draft"}}) {
//       edges {
//         node {
//           id
//           title
//           content
//           slug
//         }
//       }
//     }
//   }
//   ` 
//   : 
//   `
//   query {
//     allWpPost(filter: {status: {eq: "publish"}}) {
//       edges {
//         node {
//           id
//           title
//           content
//           slug
//         }
//       }
//     }
//   }
//   `;
