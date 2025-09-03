import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchApprove, batchReject } from '../features/postsSlice';
import { setSelectedPostForPreview, setShowKeyboardShortcuts, setConfirmationDialog, setShowUndoToast } from '../features/uiSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { selectedPosts, posts } = useSelector(state => state.posts);
  const { selectedPostForPreview } = useSelector(state => state.ui);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in inputs or textareas
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Allow shortcuts even when buttons are focused
      if (event.target.tagName === 'BUTTON') {
        event.target.blur();
      }

      switch (event.key.toLowerCase()) {
        case 'a':
          event.preventDefault();
          if (selectedPosts.length > 0) {
            dispatch(batchApprove(selectedPosts));
            dispatch(setShowUndoToast({ show: true, message: `${selectedPosts.length} posts approved` }));
            setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
          }
          break;
        case 'r':
          event.preventDefault();
          if (selectedPosts.length > 0) {
            dispatch(setConfirmationDialog({
              isOpen: true,
              type: 'reject',
              postId: null,
              postIds: selectedPosts,
            }));
          }
          break;
        case ' ':
          event.preventDefault();
          if (selectedPosts.length === 1) {
            const post = posts.find(p => p.id === selectedPosts[0]);
            if (post) {
              dispatch(setSelectedPostForPreview(post));
            }
          }
          break;
        case 'escape':
          event.preventDefault();
          if (selectedPostForPreview) {
            dispatch(setSelectedPostForPreview(null));
          }
          break;
        case '?':
          event.preventDefault();
          dispatch(setShowKeyboardShortcuts(true));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, selectedPosts, posts, selectedPostForPreview]);
};