import { motion } from 'framer-motion';
import { Check, X, Eye, Clock, User, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { approvePost, rejectPost, togglePostSelection } from '../features/postsSlice';
import { setSelectedPostForPreview, setShowRejectModal, setShowUndoToast } from '../features/uiSlice';
import { formatTimeAgo } from '../utils/dateUtils';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { selectedPosts } = useSelector(state => state.posts);
  const isSelected = selectedPosts.includes(post.id);
  const isDisabled = post.status !== 'pending';

  const handleApprove = (e) => {
    e.stopPropagation();
    dispatch(approvePost(post.id));
    dispatch(setShowUndoToast({ show: true, message: 'Post approved' }));
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handleReject = (e) => {
    e.stopPropagation();
    dispatch(rejectPost({ postId: post.id, reason: 'Rejected by moderator' }));
    dispatch(setShowUndoToast({ show: true, message: 'Post rejected' }));
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handlePreview = () => {
    dispatch(setSelectedPostForPreview(post));
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    dispatch(togglePostSelection(post.id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getReasonColor = (reason) => {
    switch (reason.toLowerCase()) {
      case 'spam': return 'bg-red-100 text-red-800';
      case 'inappropriate content': return 'bg-orange-100 text-orange-800';
      case 'harassment': return 'bg-red-100 text-red-800';
      case 'misinformation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`card p-6 hover:bg-gray-50 transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      } ${isDisabled ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-4">
        {!isDisabled && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 
                className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handlePreview}
              >
                {post.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{formatTimeAgo(post.reportedAt)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" />
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getReasonColor(post.reportedReason)}`}>
                {post.reportedReason}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                {post.reportCount} reports
              </span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePreview}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Eye size={16} />
                View
              </motion.button>

              {!isDisabled && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApprove}
                    className="btn-success text-sm"
                  >
                    <Check size={16} />
                    Approve
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReject}
                    className="btn-danger text-sm"
                  >
                    <X size={16} />
                    Reject
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;