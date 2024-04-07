import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus } from "./postsSlice";

import PostExperts from "./PostExperts";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "idle") {
  } else if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((item) => (
      <PostExperts key={item.id} item={item} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }
  return <div>{content}</div>;
};

export default PostsList;
