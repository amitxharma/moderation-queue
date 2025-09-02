import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowKeyboardShortcuts } from '../features/uiSlice';

const KeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { showKeyboardShortcuts } = useSelector(state => state.ui);

  const shortcuts = [
    { key: 'A', description: 'Approve selected posts' },
    { key: 'R', description: 'Reject selected posts' },
    { key: 'Space', description: 'Preview selected post' },
    { key: 'Esc', description: 'Close modal/clear selection' },
    { key: '?', description: 'Show keyboard shortcuts' },
  ];

  const handleClose = () => {
    dispatch(setShowKeyboardShortcuts(false));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {showKeyboardShortcuts && (
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Keyboard className="text-blue-600 dark:text-blue-400" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                  <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-sm font-mono font-semibold text-gray-800 dark:text-gray-200 shadow-sm">
                    {shortcut.key}
                  </kbd>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500 rounded text-gray-700 dark:text-gray-300">?</kbd> anytime to show this help
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;