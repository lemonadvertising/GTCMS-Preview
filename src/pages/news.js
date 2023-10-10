import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layouts";
const PostTemplate = ({ data }) => {
  // const posts = data.allWpNews.edges;

  const posts = process.env.NODE_ENV === 'development' ? data.allWpNews.edges : data.allWpNews.edges.filter(
    (edge) => edge.node.publishStatus.status === "publish"
  );


  
  return (
    <Layout>
    <div className="container">
      <div className="row">
      {
        posts.map((data) => {
            return <div className="col-4"><div className="card"> 
                <GatsbyImage image={data.node.featuredImage.node.gatsbyImage} />  
            <div className="card-body">
              <h5 className="card-title">{data.node.additional_fields.shortTitle}</h5>
              <p className="postStatus">Post Status: <span className={data.node.publishStatus.status === "publish" ? "green" : "yellow"}>{data.node.publishStatus.status}</span></p>
              <p className="card-text">
              {data.node.additional_fields.shortDescription.substring(0,200)}
              </p>
              <Link to={`${data.node.uri}`} className="btn">Go somewhere</Link>
            </div>
          </div></div>
        })
      }
      </div>

    </div>
    </Layout>
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
            publishStatus {
              status
            }
            featuredImage {
              node {
                gatsbyImage(width: 400)
            
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
    }
  }
`;

export default PostTemplate;
