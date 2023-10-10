import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layouts";
const PostTemplate = ({ data }) => {
  const post = data.wpNews;


  return (
    <Layout>
    <div className="container">
            
            <div className="row heroSection">
        <div className="col-md-12">
            

            <GatsbyImage
              image={post.additional_fields.bannerImage.gatsbyImage?post.additional_fields.bannerImage.gatsbyImage:""}    
            />

<h2>{post.title?post.title:""}</h2>
            </div>
            </div>

          
            
        <div className="row headerSection">
        <div className="col-md-10">
        <div className="acfText">
      <h4>{post.additional_fields.shortTitle?post.additional_fields.shortTitle:""}</h4>
      <p>{post.additional_fields.shortDescription?post.additional_fields.shortDescription:""}</p>
      </div>
      </div>

      <div className="col-md-2">
            <GatsbyImage
              image={post.featuredImage.node.gatsbyImage?post.featuredImage.node.gatsbyImage:""}    
            />
                </div>

      </div>

   
        <div className="row bodySection">
            <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: post.content?post.content:"" }} />
            </div>

            
       
      </div>
    </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    wpNews(slug: { eq: $slug }) {
      title
      content
      featuredImage {
        node {
          gatsbyImage(width: 720)
        }
      }
      additional_fields {
        bannerImage {
          gatsbyImage(width: 1920)
          altText
        }
        shortTitle
        shortDescription
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
