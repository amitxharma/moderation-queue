import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Inbox } from 'lucide-react';

const EmptyState = ({ filter }) => {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'pending':
        return {
          icon: CheckCircle,
          title: 'All clear! 🎉',
          description: 'No posts are waiting for review right now.',
          color: 'text-green-500',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          title: 'No approved posts yet',
          description: 'Approved posts will appear here once you start moderating.',
          color: 'text-green-500',
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'No rejected posts',
          description: 'Rejected posts will appear here when you decline content.',
          color: 'text-red-500',
        };
      default:
        return {
          icon: Inbox,
          title: 'No posts found',
          description: 'There are no posts to display at the moment.',
          color: 'text-gray-500',
        };
    }
  };

  const { icon: Icon, title, description, color } = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className={`${color} mb-4`}
      >
        <Icon size={64} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-400 text-center max-w-md"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default EmptyState;