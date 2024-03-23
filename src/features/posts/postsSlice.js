import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: "2",
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: {
      reducer(state, actions) {
        state.push(actions.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
          },
        };
      },
    },
    //     updatePosts: {},
    //     deletePosts: {},
  },
});
// export const [addPosts, updatePosts, deletePosts] = postsSlice.actions;
export const { addPosts } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
