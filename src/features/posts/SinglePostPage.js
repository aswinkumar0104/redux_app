import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
import AddAuthor from "./AddAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>No Posts Found</h2>
      </section>
    );
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${postId}`}>Edit Post</Link>
        <AddAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  );
};

export default SinglePostPage;
