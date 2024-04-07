import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' || 'loading' || 'success' || 'error'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialState) => {
    const response = await axios.post(POSTS_URL, initialState);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      console.log(initialPost);
      if (response?.status === 200) return initialPost;
      return `${response?.status} : ${response?.statusText}`;
    } catch (err) {
      console.log("Failed to delete", err);
      return err.message;
    }
  }
);

// const initialState = [
//   {
//     id: "1",
//     title:
//       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "qui est esse",
//     body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//     },
//   },
// ];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: {
      reducer(state, actions) {
        state.posts.push(actions.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, actions) {
      const { postId, reaction } = actions.payload;
      const existingPost = state.posts.find((item) => item.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    //     updatePosts: {},
    //     deletePosts: {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const fetchedPosts = action.payload.map((item) => {
          item.date = sub(new Date(), { minutes: min++ }).toISOString();
          item.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
          };
          return item;
        });

        state.posts = fetchedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const sorterPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });

        action.payload.id = sorterPosts[sorterPosts.length - 1].id++;
        action.payload.date = new Date().toISOString();
        action.payload.userId = Number(action.payload.userId);
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log(action.payload);
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== Number(id));
        state.posts = posts;
      });
  },
});
// export const [addPosts, updatePosts, deletePosts] = postsSlice.actions;

export const { addPosts, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export default postsSlice.reducer;
