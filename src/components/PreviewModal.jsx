import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, User, Clock, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPostForPreview } from '../features/uiSlice';
import { formatTimeAgo } from '../utils/dateUtils';

const PreviewModal = () => {
  const dispatch = useDispatch();
  const { selectedPostForPreview } = useSelector(state => state.ui);
  const { posts } = useSelector(state => state.posts);

  if (!selectedPostForPreview) return null;

  const currentIndex = posts.findIndex(p => p.id === selectedPostForPreview.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < posts.length - 1;

  const handleClose = () => {
    dispatch(setSelectedPostForPreview(null));
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      dispatch(setSelectedPostForPreview(posts[currentIndex - 1]));
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      dispatch(setSelectedPostForPreview(posts[currentIndex + 1]));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-backdrop flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {posts.length}
              </span>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPostForPreview.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium">{selectedPostForPreview.author.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{formatTimeAgo(selectedPostForPreview.reportedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                    {selectedPostForPreview.reportCount} reports
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-orange-800 bg-orange-100 px-3 py-1 rounded-lg">
                  Reported for: {selectedPostForPreview.reportedReason}
                </span>
              </div>
            </div>

            {selectedPostForPreview.imageUrl && (
              <div className="mb-6">
                <img
                  src={selectedPostForPreview.imageUrl}
                  alt="Post content"
                  className="w-full max-w-2xl mx-auto rounded-xl shadow-md"
                />
              </div>
            )}

            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {selectedPostForPreview.content}
              </p>
            </div>

            {selectedPostForPreview.rejectionReason && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2">Rejection Reason:</h3>
                <p className="text-red-700">{selectedPostForPreview.rejectionReason}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">Esc</kbd> to close
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedPostForPreview.status === 'approved' ? 'bg-green-100 text-green-800' :
                selectedPostForPreview.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedPostForPreview.status.charAt(0).toUpperCase() + selectedPostForPreview.status.slice(1)}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewModal;