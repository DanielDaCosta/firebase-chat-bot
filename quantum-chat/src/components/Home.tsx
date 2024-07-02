import BlogList from './BlogList';
import useFetch from '../hooks/useFetch';
import React from 'react';

const Home = () => {

    const {data:blogs, isPending, error} = useFetch('books')

    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
    );
}
 
export default Home;