import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchApprove, batchReject } from '../features/postsSlice';
import { setSelectedPostForPreview, setShowKeyboardShortcuts } from '../features/uiSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { selectedPosts, posts } = useSelector(state => state.posts);
  const { selectedPostForPreview } = useSelector(state => state.ui);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'a':
          if (selectedPosts.length > 0) {
            dispatch(batchApprove(selectedPosts));
          }
          break;
        case 'r':
          if (selectedPosts.length > 0) {
            dispatch(batchReject({ postIds: selectedPosts, reason: 'Bulk rejection' }));
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
          if (selectedPostForPreview) {
            dispatch(setSelectedPostForPreview(null));
          }
          break;
        case '?':
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