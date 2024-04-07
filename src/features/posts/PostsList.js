import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import { fetchUsers } from "../users/usersSlice";

import PostExperts from "./PostExperts";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
    dispatch(fetchUsers());
  }, [postsStatus, dispatch]);

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
  return (
    <div>
      <h3>Posts</h3>
      {content}
    </div>
  );
};

export default PostsList;
