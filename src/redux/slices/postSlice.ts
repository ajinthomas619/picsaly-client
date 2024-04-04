import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "@/utils/interfaces/interface";

// Assuming PostData is defined as shown above
interface PostState {
 post: PostData;

}

// Define the initial state using the PostData interface
const initialState: PostState = {
 post: {
    _id: '',
    caption: '',
    location: '',
    createdBy: '',
    image: [],
    like: [],
    comment: [],
    tags:[],
    createdOn: new Date(Date.now()),
 },

 }



const postSlice = createSlice({
 name: 'post',
 initialState,
 reducers: {
  addPostData:(state,action) => {
  if(action.payload){
     return {...state,initialState:action.payload}
  }
  },
  clearPostData:(state) => {
    state.post = {    _id: '',
    caption: '',
    location: '',
    createdBy: '',
    image: [],
    like: [],
    comment: [],
    tags:[],
    createdOn: new Date(Date.now()),}
  },

    setPost: (state, action) => {
      state.post = action.payload;
    },
    removePost:(state) => {
     state.post = initialState.post
    },
    addImage: (state,action) => {
      if (action.payload) {
        state.post.image.push(action.payload);
      }
    },
    removeImage: (state, action) => {
      state.post.image = state.post.image.filter((image) => image !== action.payload);
    },
    clearImage: (state) => {
      state.post.image = [];
    },
    // Additional reducers for updating other properties of the post
    setCaption: (state, action) => {
      state.post.caption = action.payload;
    },
    setLocation: (state, action) => {
      state.post.location = action.payload;
    },
    setAuthor: (state, action) => {
      state.post.createdBy = action.payload;
    },
    setTags:(state,action) => {
        state.post.tags.push(action.payload)
    },
    incrementLikes: (state,action) => {
      state.post.like.push(action.payload);
    },
    incrementComments: (state,action) => {
      state.post.comment.push(action.payload);
    },
 },
});

export const {addPostData,clearPostData, setPost,removePost, addImage, removeImage,setTags, clearImage, setCaption, setLocation, setAuthor, incrementLikes, incrementComments } = postSlice.actions;
export default postSlice.reducer;