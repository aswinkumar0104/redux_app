import "./App.css";
import { compose, pipe } from "lodash/fp";
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./features/Components/Layout";
import EditPostForm from "./features/posts/EditPostForm";

// function add(a) {
//   return function (b) {
//     return a + b;
//   };
// }

// const add2 = (a) => (b) => a + b;
// let addone = add2(3)(7);
// console.log(addone);

//console.log(add(3, 7));

// const trim = (str) => str.trim();
// const lower = (str) => str.toLowerCase();

// const wrap = (type) => (str) => `<${type}>${str}</${type}`;

// const result = pipe(trim, lower, wrap("div"));
// const res = result("ASWIn");
// console.log(res);

// function random(number) {

// }
function App() {
  return (
    // <main>
    //   {/* <Counter /> */}
    //   <AddPostForm />
    //   <PostsList />
    // </main>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
