import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, List } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/postsSlice';

const StatusTabs = () => {
  const dispatch = useDispatch();
  const { filter, posts } = useSelector(state => state.posts);

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: posts.filter(p => p.status === 'pending').length },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: posts.filter(p => p.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: posts.filter(p => p.status === 'rejected').length },
    { id: 'all', label: 'All', icon: List, count: posts.length },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl transition-colors duration-300 w-full sm:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => dispatch(setFilter(tab.id))}
          className={`relative px-3 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
            filter === tab.id
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          {filter === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <tab.icon size={16} />
            </motion.div>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }`}>
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;