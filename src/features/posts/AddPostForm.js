import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChange = (value) => {
    setTitle(value);
  };
  const contentChange = (value) => {
    setContent(value);
  };
  const savePost = () => {
    if (title && content) {
      dispatch(addPosts(title, content));
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
          onChange={(e) => titleChange(e.target.value)}
        />
        <label>Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => contentChange(e.target.value)}
        />
        <button type="button" onClick={savePost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
