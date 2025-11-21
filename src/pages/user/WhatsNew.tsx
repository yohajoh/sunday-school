import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { PostCard } from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Bell,
  Sparkles,
  Zap,
  Shield,
  Calendar,
  Users,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export const WhatsNew: React.FC = () => {
  const { t } = useLanguage();
  const { posts, currentUser, addComment } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Filter posts for user audience
  const userPosts = posts.filter(
    (post) =>
      post.status === "published" &&
      (post.targetAudience === "all" || post.targetAudience === "students")
  );

  const filteredPosts = userPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(userPosts.map((post) => post.category))];
  const pinnedPosts = filteredPosts.filter((post) => post.isPinned);
  const regularPosts = filteredPosts.filter((post) => !post.isPinned);

  const handleCommentSubmit = async (postId: string) => {
    const commentText = commentInputs[postId]?.trim();

    if (!commentText) return;

    try {
      await addComment(postId, {
        id: Date.now().toString(),
        userId: currentUser?.id || "",
        userName: currentUser?.firstName + " " + currentUser?.lastName,
        userAvatar: "",
        text: commentText,
        timestamp: new Date().toISOString(),
        likes: [],
      });

      // Clear input and show success
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      toast.success(t("whatsNew.commentPosted"));
    } catch (error) {
      toast.error(t("whatsNew.failedToPost"));
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  return (
    <div className="space-y-6 sm:p-6">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800 via-purple-900 to-pink-900 p-6 sm:p-8 text-white border border-purple-500/20">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-400/30">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    {t("whatsNew.title")}
                  </h1>
                  <p className="text-purple-100 text-sm sm:text-lg mt-2">
                    {t("whatsNew.subtitle")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      {userPosts.length}
                    </p>
                    <p className="text-xs text-purple-200 truncate">
                      {t("whatsNew.totalPosts")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      {pinnedPosts.length}
                    </p>
                    <p className="text-xs text-pink-200 truncate">
                      {t("whatsNew.pinned")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      {
                        userPosts.filter((p) => p.category === "announcement")
                          .length
                      }
                    </p>
                    <p className="text-xs text-emerald-200 truncate">
                      {t("whatsNew.announcements")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder={t("whatsNew.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all duration-300 w-full sm:w-80"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 w-full sm:w-auto"
          >
            <option value="all">{t("whatsNew.allCategories")}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl shadow-lg w-full sm:w-auto">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 dark:text-slate-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
              {t("whatsNew.pinnedAnnouncements")}
            </h2>
          </div>

          <div className="space-y-6">
            {pinnedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={() => {}} // Empty function for user view
                showActions={false}
                onToggleComments={() => toggleComments(post.id)}
                showComments={showComments[post.id]}
                commentInput={commentInputs[post.id] || ""}
                onCommentChange={(value) => handleCommentChange(post.id, value)}
                onCommentSubmit={() => handleCommentSubmit(post.id)}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="space-y-6">
        {pinnedPosts.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
              {t("whatsNew.allCommunityPosts")}
            </h2>
          </div>
        )}

        {regularPosts.length > 0 ? (
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={() => {}} // Empty function for user view
                showActions={false}
                onToggleComments={() => toggleComments(post.id)}
                showComments={showComments[post.id]}
                commentInput={commentInputs[post.id] || ""}
                onCommentChange={(value) => handleCommentChange(post.id, value)}
                onCommentSubmit={() => handleCommentSubmit(post.id)}
                currentUser={currentUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium mb-2">
              {t("whatsNew.noPostsFound")}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">
              {searchTerm
                ? t("whatsNew.tryAdjustingSearch")
                : t("whatsNew.noPostsAvailable")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
