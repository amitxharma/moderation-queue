import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { undoLastAction } from '../features/postsSlice';
import { setShowUndoToast } from '../features/uiSlice';

const UndoToast = () => {
  const dispatch = useDispatch();
  const { showUndoToast, undoMessage } = useSelector(state => state.ui);

  const handleUndo = () => {
    dispatch(undoLastAction());
    dispatch(setShowUndoToast({ show: false }));
  };

  const handleClose = () => {
    dispatch(setShowUndoToast({ show: false }));
  };

  return (
    <AnimatePresence>
      {showUndoToast && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-sm">
            <span className="flex-1">{undoMessage}</span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUndo}
              className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all text-sm font-medium"
            >
              <Undo2 size={14} />
              Undo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UndoToast;