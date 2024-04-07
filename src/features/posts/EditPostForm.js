import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, selectPostById, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams();

  const navigate = useNavigate();

  // postId = 1;

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const dispatch = useDispatch();
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const users = useSelector(selectAllUsers);
  const [addReqStatus, setAddReqStatus] = useState("idle");

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);
  const onChangeUserId = (e) => setUserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && addReqStatus === "idle";

  const handleUpdatePost = () => {
    if (canSave) {
      try {
        setAddReqStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("Failed to Update", err);
      } finally {
        setAddReqStatus("idle");
      }
    }
  };

  const handleDeletePost = () => {
    if (canSave) {
      try {
        setAddReqStatus("pending");
        dispatch(deletePost({ id: postId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.log("Failed to Update", err);
      } finally {
        setAddReqStatus("idle");
      }
    }
  };

  return (
    <section>
      <form>
        <label>Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onChangeTitle}
        />
        <label>Post Author:</label>
        <select id="postAuthor" value={userId} onChange={onChangeUserId}>
          {users.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label>Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onChangeContent}
        />
        <button type="button" onClick={handleUpdatePost} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={handleDeletePost}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
