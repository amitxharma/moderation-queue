import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../features/postsSlice';

const Pagination = ({ totalPosts, filteredPosts }) => {
  const dispatch = useDispatch();
  const { currentPage, postsPerPage } = useSelector(state => state.posts.pagination);
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <motion.button
        whileHover={{ 
          scale: 1.05,
          x: -2
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {getVisiblePages().map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ 
            scale: page !== '...' ? 1.05 : 1,
            y: page !== '...' ? -2 : 0
          }}
          whileTap={{ scale: page !== '...' ? 0.95 : 1 }}
          onClick={() => page !== '...' && handlePageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
            page === currentPage
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
              : page === '...'
              ? 'text-gray-400 dark:text-gray-600 cursor-default'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <motion.span
            animate={page === currentPage ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {page}
          </motion.span>
        </motion.button>
      ))}

      <motion.button
        whileHover={{ 
          scale: 1.05,
          x: 2
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
};

export default Pagination;