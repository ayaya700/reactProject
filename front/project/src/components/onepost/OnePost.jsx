import { useEffect, useState, useContext } from "react";
import "./onepost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function OnePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:8000/imgs/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("http://localhost:8000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchpost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="onepost">
      <div className="onepostcontainer">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="onepostImg" />
        )}
        {update ? (
          <input
            type="text"
            value={title}
            className="onepostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="onepostTitle">
            {title}
            {post.username === user?.username && (
              <div className="onepostEdit">
                <svg
                  className="onepostIcon w-6 h-6 text-gray-800 dark:text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => setUpdate(true)}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
                <svg
                  className="onepostIcon w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={handleDelete}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </div>
            )}
          </h1>
        )}
        <div className="onepostInfo">
          <span className="onepostAuthor">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              {post.username}
            </Link>
          </span>

          <span className="onepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {update ? (
          <textarea
            className="onepostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="onepostDesc">{desc}</p>
        )}
        {update && (
          <button className="onepostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
