import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);
  const [addReqStatus, setAddReqStatus] = useState("idle");

  const titleChange = (value) => {
    setTitle(value);
  };
  const contentChange = (value) => {
    setContent(value);
  };
  const userIdChange = (value) => setUserId(value);

  const canSave =
    [title, content, userId].every(Boolean) && addReqStatus === "idle";

  const savePost = () => {
    if (canSave) {
      try {
        setAddReqStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Found Error", err);
      } finally {
        setAddReqStatus("idle");
      }
    }
  };

  // const savePost = () => {
  //   if (title && content) {
  //     dispatch(addPosts(title, content, userId));
  //   }
  // };

  return (
    <section>
      <form>
        <label>Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => titleChange(e.target.value)}
        />
        <label>Post Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => userIdChange(e.target.value)}
        >
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
          onChange={(e) => contentChange(e.target.value)}
        />
        <button type="button" onClick={savePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
