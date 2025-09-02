import { createSlice } from '@reduxjs/toolkit';
import { mockPosts } from '../data/mockPosts';

const initialState = {
  posts: mockPosts,
  selectedPosts: [],
  filter: 'pending', // pending, approved, rejected, all
  undoStack: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    approvePost: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        const previousStatus = post.status;
        post.status = 'approved';
        state.undoStack.push({ id: postId, previousStatus, action: 'approve' });
      }
    },
    rejectPost: (state, action) => {
      const { postId, reason } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        const previousStatus = post.status;
        post.status = 'rejected';
        post.rejectionReason = reason;
        state.undoStack.push({ id: postId, previousStatus, action: 'reject' });
      }
    },
    batchApprove: (state, action) => {
      const postIds = action.payload;
      postIds.forEach(id => {
        const post = state.posts.find(p => p.id === id);
        if (post) {
          const previousStatus = post.status;
          post.status = 'approved';
          state.undoStack.push({ id, previousStatus, action: 'approve' });
        }
      });
      state.selectedPosts = [];
    },
    batchReject: (state, action) => {
      const { postIds, reason } = action.payload;
      postIds.forEach(id => {
        const post = state.posts.find(p => p.id === id);
        if (post) {
          const previousStatus = post.status;
          post.status = 'rejected';
          post.rejectionReason = reason;
          state.undoStack.push({ id, previousStatus, action: 'reject' });
        }
      });
      state.selectedPosts = [];
    },
    undoLastAction: (state) => {
      const lastAction = state.undoStack.pop();
      if (lastAction) {
        const post = state.posts.find(p => p.id === lastAction.id);
        if (post) {
          post.status = lastAction.previousStatus;
          delete post.rejectionReason;
        }
      }
    },
    togglePostSelection: (state, action) => {
      const postId = action.payload;
      const index = state.selectedPosts.indexOf(postId);
      if (index > -1) {
        state.selectedPosts.splice(index, 1);
      } else {
        state.selectedPosts.push(postId);
      }
    },
    selectAllPosts: (state) => {
      const pendingPosts = state.posts.filter(p => p.status === state.filter).map(p => p.id);
      state.selectedPosts = pendingPosts;
    },
    clearSelection: (state) => {
      state.selectedPosts = [];
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.selectedPosts = [];
    },
  },
});

export const {
  approvePost,
  rejectPost,
  batchApprove,
  batchReject,
  undoLastAction,
  togglePostSelection,
  selectAllPosts,
  clearSelection,
  setFilter,
} = postsSlice.actions;

export default postsSlice.reducer;