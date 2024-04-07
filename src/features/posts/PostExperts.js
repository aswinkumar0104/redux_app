import React from "react";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import AddAuthor from "./AddAuthor";
import { Link } from "react-router-dom";

const PostExperts = ({ item }) => {
  return (
    <article>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${item.id}`}>View Post</Link>
        <AddAuthor userId={item.userId} />
        <TimeAgo timestamp={item.date} />
        <ReactionButtons post={item} />
      </p>
    </article>
  );
};

export default PostExperts;
