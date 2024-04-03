import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import React from "react";

const reactEmoji = {
  thumbsUp: "👍",
  wow: "😀",
  heart: "💖",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactEmoji).map(([name, emoji]) => {
    return (
      <button
        style={{ cursor: "pointer" }}
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
