import {Link} from 'react-router-dom'
import React from 'react';

type Props = {
    blogs: {
        author: string,
        title: string,
        body: string, 
        id: string,
    }[],
    title: string
}

const BlogList = ({blogs, title}: Props) => {

    return (  
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) => (
            <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <p> Written by {blog.author}</p>
                </Link>
            </div>
          ))}
        </div>
    );
}
 
export default BlogList;