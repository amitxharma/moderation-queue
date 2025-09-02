import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { batchApprove, batchReject, clearSelection } from '../features/postsSlice';
import { setShowUndoToast } from '../features/uiSlice';

const BatchToolbar = () => {
  const dispatch = useDispatch();
  const { selectedPosts } = useSelector(state => state.posts);

  if (selectedPosts.length === 0) return null;

  const handleBatchApprove = () => {
    dispatch(batchApprove(selectedPosts));
    dispatch(setShowUndoToast({ show: true, message: `${selectedPosts.length} posts approved` }));
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handleBatchReject = () => {
    dispatch(batchReject({ postIds: selectedPosts, reason: 'Bulk rejection by moderator' }));
    dispatch(setShowUndoToast({ show: true, message: `${selectedPosts.length} posts rejected` }));
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.span
                key={selectedPosts.length}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {selectedPosts.length} selected
              </motion.span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBatchApprove}
                className="btn-success flex items-center gap-2"
              >
                <Check size={16} />
                Approve All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBatchReject}
                className="btn-danger flex items-center gap-2"
              >
                <X size={16} />
                Reject All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearSelection}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                title="Clear selection"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchToolbar;