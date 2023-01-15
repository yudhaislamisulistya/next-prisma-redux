
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "redux/actions/postsAction";

const Posts = () => {

    const postsData = useSelector((state) => state.postsData);
    const dispatch = useDispatch();
    const { data } = postsData;

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return (
        <div>
            <Link href={'/posts/add'}>
                Add Post
            </Link>
            <h1>Posts</h1>
            {data && data.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default Posts;

