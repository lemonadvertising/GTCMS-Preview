import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
const PostTemplate = ({ data }) => {
  const posts = data.allWpNews.edges;
  
  return (
    <div className="container">
      <div className="row">
      {
        posts.map((data) => {
            return <div className="col-4"><div className="card">   
            <div className="card-body">
              <h5 className="card-title">{data.node.title}</h5>
           
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href={`${data.node.uri}`} className="btn btn-primary">Go somewhere</a>
            </div>
          </div></div>
        })
      }
      </div>

    </div>
  );
};
// allWpPost(filter: {status: {in: ["draft"]}}) {
export const query = graphql`
  query{
    allWpNews {
      edges {
        node {
            title
            uri
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
    }
  }
`;

export default PostTemplate;
