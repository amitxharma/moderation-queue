import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPostForPreview: null,
  showRejectModal: false,
  showUndoToast: false,
  undoMessage: '',
  showKeyboardShortcuts: false,
  confirmationDialog: {
    isOpen: false,
    type: null,
    postId: null,
    postIds: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedPostForPreview: (state, action) => {
      state.selectedPostForPreview = action.payload;
    },
    setShowRejectModal: (state, action) => {
      state.showRejectModal = action.payload;
    },
    setShowUndoToast: (state, action) => {
      state.showUndoToast = action.payload.show;
      state.undoMessage = action.payload.message || '';
    },
    setShowKeyboardShortcuts: (state, action) => {
      state.showKeyboardShortcuts = action.payload;
    },
    setConfirmationDialog: (state, action) => {
      state.confirmationDialog = action.payload;
    },
  },
});

export const {
  setSelectedPostForPreview,
  setShowRejectModal,
  setShowUndoToast,
  setShowKeyboardShortcuts,
  setConfirmationDialog,
} = uiSlice.actions;

export default uiSlice.reducer;