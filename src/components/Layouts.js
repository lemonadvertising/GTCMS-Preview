import React from "react";
import { graphql, Link } from "gatsby";
export default function Layout({ children }) {
  return (
    <div>
{/* 
    <div className="header">
        <h1>Header</h1>
    </div> */}
    <div className="container">
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Lemon</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          {/* <Link className="nav-link" to="/posts">Posts</Link> */}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/news">News</Link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
</div>

      {children}
    </div>
  );
}
