import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPostForPreview: null,
  showRejectModal: false,
  showUndoToast: false,
  undoMessage: '',
  showKeyboardShortcuts: false,
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
  },
});

export const {
  setSelectedPostForPreview,
  setShowRejectModal,
  setShowUndoToast,
  setShowKeyboardShortcuts,
} = uiSlice.actions;

export default uiSlice.reducer;