import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import React from 'react';

type IUser = {
    title: string,
    body: string,
    author: string
}

const Create = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');
    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void=> {
        e.preventDefault();
        const blog:IUser = {title, body, author};

        setIsPending(true); 
        
        const db = getFirestore();
        const colRef = collection(db, 'books');

        addDoc(colRef, {
            title: blog.title,
            body: blog.body,
            author: blog.author
        }).then(() => {
            setIsPending(false);
            navigate('/')
        })

    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" 
                 required
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                 required
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                ></textarea> 
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}
 
export default Create;