import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layouts";
const PostTemplate = ({ data }) => {
  const posts = process.env.NODE_ENV === 'development' ? data.allWpPost.edges : data.allWpPost.edges.filter(
      (edge) => edge.node.publishStatus.status === "publish"
    );


  console.log("post",posts)

  return (
    <Layout>
    <div className="container">
      <div className="row">
      {
        posts.map((data) => {
            return <div className="col-4"><div className="card">
            {/* <GatsbyImage image={data.node.featuredImage.node.gatsbyImage} /> */}
            {/* {console.log("url", data)} */}
            <div className="card-body">
              <h5 className="card-title">{data.node.title}</h5>
              <p className="postStatus">Post Status: <span className={data.node.publishStatus.status === "publish" ? "green" : "yellow"}>{data.node.publishStatus.status}</span></p>
              <p className="card-text" dangerouslySetInnerHTML={{__html:data.node.content.substring(0,50)}} />
              <Link to={`/post${data.node.uri}`} className="btn">Go somewhere</Link>
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
    allWpPost {
      edges {
        node {
          title
          uri
          content
          publishStatus {
            status
          }
          featuredImage {
            node {
              gatsbyImage(width: 400)
          
            }
          }
        }
      }
    }
  }
`;

export default PostTemplate;
