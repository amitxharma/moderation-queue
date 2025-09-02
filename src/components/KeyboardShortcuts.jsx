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
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Keyboard className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-gray-700">{shortcut.description}</span>
                  <kbd className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-mono font-semibold text-gray-800 shadow-sm">
                    {shortcut.key}
                  </kbd>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Press <kbd className="px-2 py-1 bg-gray-100 border rounded">?</kbd> anytime to show this help
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;