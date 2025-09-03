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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[80vh] overflow-hidden transition-colors duration-300 flex flex-col"
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
          <div className="flex-1 flex overflow-hidden">
            {/* Left Side - Content */}
            <div className="w-1/2 p-4 overflow-y-auto">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {selectedPostForPreview.title}
              </h1>
              
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{selectedPostForPreview.author.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatTimeAgo(selectedPostForPreview.reportedAt)}</span>
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                  {selectedPostForPreview.reportCount} reports
                </span>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <AlertTriangle size={12} className="text-orange-500" />
                <span className="text-xs text-orange-800 bg-orange-100 px-2 py-1 rounded">
                  {selectedPostForPreview.reportedReason}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {selectedPostForPreview.content}
              </p>

              {selectedPostForPreview.rejectionReason && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                  <h3 className="font-semibold text-red-800 text-xs mb-1">Rejection Reason:</h3>
                  <p className="text-red-700 text-xs">{selectedPostForPreview.rejectionReason}</p>
                </div>
              )}
            </div>

            {/* Right Side - Image */}
            <div className="w-1/2 p-4 border-l border-gray-200 dark:border-gray-700">
              {selectedPostForPreview.imageUrl ? (
                <img
                  src={selectedPostForPreview.imageUrl}
                  alt="Post content"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewModal;