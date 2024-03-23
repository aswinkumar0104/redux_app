import "./App.css";
import { compose, pipe } from "lodash/fp";
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

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
    <main>
      {/* <Counter /> */}
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
