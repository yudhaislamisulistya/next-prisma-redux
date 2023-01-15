import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addData } from "redux/actions/postsAction";


const AddPost = () => {

    const [post, setPost] = useState({
        title: '',
        content: '',
        published: false
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const val = e.target.type === 'checkbox' ? e.target.checked : value;

        setPost({
            ...post,
            [name]: val
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (post.title === '' || post.content === '') {
            toast.error('Please fill all input');
            return;
        }

        setPost({
            title: '',
            content: '',
            published: false
        })
        const data = { title: post.title, content: post.content, published: post.published };
        dispatch(addData(data));
    }


    return (
        <div>
            <h1>Add Post</h1>
            <Link href={'/posts'}>
                Back
            </Link>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={post.title}/><br />
                <label htmlFor="content">Content</label>
                <input type="text" name="content" id="content" value={post.content}/><br />
                <label htmlFor="published">Published</label>
                <input type="checkbox" name="published" id="published" value={post.published} checked={post.published} /><br />
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddPost;