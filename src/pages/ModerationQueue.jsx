import { motion } from "framer-motion";
import {
  Shield,
  HelpCircle,
  CheckSquare,
  Check,
  X,
  Square,
} from "lucide-react";
import { useScrollEffect } from "../hooks/useScrollEffect";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  clearSelection,
  rejectPost,
  batchReject,
  batchApprove,
} from "../features/postsSlice";
import {
  setShowKeyboardShortcuts,
  setConfirmationDialog,
  setShowUndoToast,
} from "../features/uiSlice";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import PostCard from "../components/PostCard";
import PreviewModal from "../components/PreviewModal";

import UndoToast from "../components/UndoToast";
import StatusTabs from "../components/StatusTabs";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import EmptyState from "../components/EmptyState";
import ThemeToggle from "../components/ThemeToggle";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Pagination from "../components/Pagination";

const ModerationQueue = () => {
  const dispatch = useDispatch();
  const { posts, selectedPosts, filter, pagination } = useSelector(
    (state) => state.posts
  );
  const { confirmationDialog } = useSelector((state) => state.ui);
  const isScrolled = useScrollEffect();

  useKeyboardShortcuts();

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  // Pagination logic
  const { currentPage, postsPerPage } = pagination;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const pendingPosts = filteredPosts.filter((p) => p.status === "pending");
  const allSelected =
    pendingPosts.length > 0 &&
    pendingPosts.every((p) => selectedPosts.includes(p.id));

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

  const handleConfirmReject = (reason) => {
    if (confirmationDialog.postId) {
      // Single post rejection
      dispatch(
        rejectPost({
          postId: confirmationDialog.postId,
          reason: reason || "Rejected by moderator",
        })
      );
      dispatch(setShowUndoToast({ show: true, message: "Post rejected" }));
    } else if (confirmationDialog.postIds) {
      // Batch rejection
      dispatch(
        batchReject({
          postIds: confirmationDialog.postIds,
          reason: reason || "Bulk rejection by moderator",
        })
      );
      dispatch(
        setShowUndoToast({
          show: true,
          message: `${confirmationDialog.postIds.length} posts rejected`,
        })
      );
    }
    setTimeout(() => dispatch(setShowUndoToast({ show: false })), 3000);
  };

  const handleCloseConfirmation = () => {
    dispatch(
      setConfirmationDialog({
        isOpen: false,
        type: null,
        postId: null,
        postIds: null,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        animate={{
          scale: isScrolled ? 0.98 : 1,
          y: isScrolled ? 4 : 0,
          marginLeft: isScrolled ? 16 : 0,
          marginRight: isScrolled ? 16 : 0,
          borderRadius: isScrolled ? 16 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-30 transition-all duration-200"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(80px)",
        }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          animate={{
            paddingTop: isScrolled ? "0.75rem" : "1rem",
            paddingBottom: isScrolled ? "0.75rem" : "1rem",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600 dark:text-blue-400" size={28} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Moderation Queue
              </h1>
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
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8 flex justify-center">
          <StatusTabs />
        </div>

        {/* Top Pagination */}
        {filteredPosts.length > 0 && (
          <div className="my-6 flex justify-center">
            <Pagination
              totalPosts={posts.length}
              filteredPosts={filteredPosts}
            />
          </div>
        )}

        {/* Bottom Row: Approve/Reject left, Select All right */}
        {pendingPosts.length > 0 && (
          <div className="flex justify-between items-center mt-6 mb-6">
            {/* Left: Approve/Reject */}
            <div className="flex items-center gap-2">
              {selectedPosts.length > 0 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      dispatch(batchApprove(selectedPosts));
                      dispatch(
                        setShowUndoToast({
                          show: true,
                          message: `${selectedPosts.length} posts approved`,
                        })
                      );
                      setTimeout(
                        () => dispatch(setShowUndoToast({ show: false })),
                        3000
                      );
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:text-emerald-800 rounded-xl text-sm font-medium transition-all"
                  >
                    <Check size={14} />
                    <span>Approve All</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      dispatch(
                        setConfirmationDialog({
                          isOpen: true,
                          type: "reject",
                          postId: null,
                          postIds: selectedPosts,
                        })
                      );
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 rounded-xl text-sm font-medium transition-all"
                  >
                    <X size={14} />
                    <span>Reject All</span>
                  </motion.button>
                </>
              )}
            </div>

            {/* Right: Select All (always visible) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSelectAll}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
            >
              {allSelected ? (
                <CheckSquare size={16} className="text-gray-500" />
              ) : (
                <Square size={16} className="text-gray-500" />
              )}
              <span>Select All</span>
            </motion.button>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            paginatedPosts.map((post, index) => (
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

        {/* Pagination Bottom */}
        {filteredPosts.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPosts={posts.length}
              filteredPosts={filteredPosts}
            />
          </div>
        )}
      </main>

      {/* Modals and Overlays */}
      <PreviewModal />
      <UndoToast />
      <KeyboardShortcuts />
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmReject}
        title="Confirm Rejection"
        message={
          confirmationDialog.postIds
            ? `Are you sure you want to reject ${confirmationDialog.postIds?.length} selected posts?`
            : "Are you sure you want to reject this post?"
        }
        type="reject"
      />
    </div>
  );
};

export default ModerationQueue;
