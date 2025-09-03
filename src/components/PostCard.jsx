import { motion } from "framer-motion";
import { Check, X, Eye, Clock, User, AlertTriangle, Square, CheckSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  approvePost,
  rejectPost,
  togglePostSelection,
} from "../features/postsSlice";
import {
  setSelectedPostForPreview,
  setShowUndoToast,
  setConfirmationDialog,
} from "../features/uiSlice";
import { formatTimeAgo } from "../utils/dateUtils";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { selectedPosts } = useSelector((state) => state.posts);
  const isSelected = selectedPosts.includes(post.id);
  const isDisabled = post.status !== "pending";

  const handleApprove = (e) => {
    e.stopPropagation();
    dispatch(approvePost(post.id));
    dispatch(setShowUndoToast({ show: true, message: "Post approved" }));
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handleReject = (e) => {
    e.stopPropagation();
    dispatch(
      setConfirmationDialog({
        isOpen: true,
        type: "reject",
        postId: post.id,
        postIds: null,
      })
    );
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
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-yellow-600 bg-yellow-50";
    }
  };

  const getReasonColor = (reason) => {
    switch (reason.toLowerCase()) {
      case "spam":
        return "bg-red-100 text-red-800";
      case "inappropriate content":
        return "bg-orange-100 text-orange-800";
      case "harassment":
        return "bg-red-100 text-red-800";
      case "misinformation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`card p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30" : ""
      } ${isDisabled ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {!isDisabled && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCheckboxChange}
            className="sm:mt-1 self-start p-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
          >
            {isSelected ? (
              <CheckSquare size={18} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <Square size={18} className="text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400" />
            )}
          </motion.button>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
            <div className="flex-1">
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handlePreview}
              >
                {post.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
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
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  post.status
                )}`}
              >
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {post.content}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" />
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium ${getReasonColor(
                  post.reportedReason
                )}`}
              >
                {post.reportedReason}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                {post.reportCount} reports
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePreview}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">View</span>
              </motion.button>

              {!isDisabled && (
                <>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApprove}
                    className="group relative overflow-hidden px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:text-emerald-800 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                      initial={false}
                    />
                    <div className="relative flex items-center gap-1.5">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check size={14} />
                      </motion.div>
                      <span className="hidden sm:inline">Approve</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReject}
                    className="group relative overflow-hidden px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                      initial={false}
                    />
                    <div className="relative flex items-center gap-1.5">
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={14} />
                      </motion.div>
                      <span className="hidden sm:inline">Reject</span>
                    </div>
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
