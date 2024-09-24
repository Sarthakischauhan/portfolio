import React from "react";
const BlogTile = ({ blog }) => {
    return (
      <div style={{ marginBottom: '20px' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {new Date(blog.dateWritten).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}
      </p>
      <a href="/" style={{ textDecoration: 'none', color: '#FFF' }}>
        <h3 style={{ margin: '0', fontSize: '20px' }}>{blog.title}</h3>
      </a>
      <p style={{ fontStyle: 'italic', margin: '5px 0 0 0', color: '#B0B0B0' }}>{blog.desc}</p>
    </div>
    );
  };
export default BlogTile; 