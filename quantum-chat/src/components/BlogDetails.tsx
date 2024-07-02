import { useNavigate, useParams } from 'react-router-dom';
import useFetchSingleDoc from '../hooks/useFetchSingleDoc';
import { getFirestore, deleteDoc, doc } from "firebase/firestore"; 
import React from 'react';

type Blog = {
    author: string,
    title: string,
    body: string
}

type FetchResult = {
    data: Blog | null;
    isPending: boolean;
    error: any;
};

const BlogDetails = () => {

    const { id } = useParams<{id: string}>()

    const {data: blog, error, isPending} = useFetchSingleDoc({firebaseCollection: 'books', id: id!})
    const navigate = useNavigate();

    const handleClick = () => {
        if (!id) {
            console.error('Document ID is undefined');
            return;
        }
        const db = getFirestore();
        
        const docRef = doc(db, 'books', id)

        deleteDoc(docRef).then(() => {
            navigate('/')
        })
    }

    return (
        <div className="blog-details">
            { isPending && <div>Loading</div>}
            { error && <div> {error} </div>}
            { blog && (
                <article>
                    <h2> {blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )

            }
        </div>
    );
}
 
export default BlogDetails;