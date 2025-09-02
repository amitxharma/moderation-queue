import { motion } from 'framer-motion';
import { Shield, HelpCircle, CheckSquare } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, clearSelection } from '../features/postsSlice';
import { setShowKeyboardShortcuts } from '../features/uiSlice';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import PostCard from '../components/PostCard';
import PreviewModal from '../components/PreviewModal';
import BatchToolbar from '../components/BatchToolbar';
import UndoToast from '../components/UndoToast';
import StatusTabs from '../components/StatusTabs';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import EmptyState from '../components/EmptyState';
import ThemeToggle from '../components/ThemeToggle';

const ModerationQueue = () => {
  const dispatch = useDispatch();
  const { posts, selectedPosts, filter } = useSelector(state => state.posts);
  
  useKeyboardShortcuts();

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const pendingPosts = filteredPosts.filter(p => p.status === 'pending');
  const allSelected = pendingPosts.length > 0 && pendingPosts.every(p => selectedPosts.includes(p.id));

  const handleSelectAll = () => {
    if (allSelected) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAllPosts());
    }
  };

  const handleShowShortcuts = () => {
    dispatch(setShowKeyboardShortcuts(true));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600 dark:text-blue-400" size={28} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Moderation Queue</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleShowShortcuts}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                title="Keyboard shortcuts"
              >
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <StatusTabs />
          
          {pendingPosts.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSelectAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
            >
              <CheckSquare size={16} />
              {allSelected ? 'Deselect All' : 'Select All'}
            </motion.button>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Modals and Overlays */}
      <PreviewModal />
      <BatchToolbar />
      <UndoToast />
      <KeyboardShortcuts />
    </div>
  );
};

export default ModerationQueue;