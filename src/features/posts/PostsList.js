import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map((item) => (
    <article key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.body.substring(0, 100)}</p>
    </article>
  ));
  return (
    <div>
      <h3>Posts</h3>
      {renderedPosts}
    </div>
  );
};

export default PostsList;
