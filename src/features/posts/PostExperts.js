import React from "react";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import AddAuthor from "./AddAuthor";

const PostExperts = ({ item }) => {
  return (
    <article>
      <h3>{item.title}</h3>
      <p>{item.body.substring(0, 100)}</p>
      <p className="postCredit">
        <AddAuthor userId={item.userId} />
        <TimeAgo timestamp={item.date} />
        <ReactionButtons post={item} />
      </p>
    </article>
  );
};

export default PostExperts;
