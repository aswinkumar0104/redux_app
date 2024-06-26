import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const AddAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => parseInt(user.id) === userId);

  return <span>by {author ? author.name : "unknown user"}</span>;
};

export default AddAuthor;
