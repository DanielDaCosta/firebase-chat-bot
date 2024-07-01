import { useNavigate, useParams } from 'react-router-dom';
import useFetchSingleDoc from './useFetchSingleDoc';
import { getFirestore, deleteDoc, doc } from "firebase/firestore"; 

const BlogDetails = () => {

    const { id } = useParams()

    const {data: blog, error, isPending} = useFetchSingleDoc('books', id)
    const navigate = useNavigate();

    const handleClick = () => {
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