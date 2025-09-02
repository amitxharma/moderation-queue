import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/postsSlice';

const StatusTabs = () => {
  const dispatch = useDispatch();
  const { filter, posts } = useSelector(state => state.posts);

  const tabs = [
    { id: 'pending', label: 'Pending', count: posts.filter(p => p.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: posts.filter(p => p.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: posts.filter(p => p.status === 'rejected').length },
    { id: 'all', label: 'All', count: posts.length },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => dispatch(setFilter(tab.id))}
          className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            filter === tab.id
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {filter === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-xl shadow-sm"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-600'
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