import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Filter,
  FileText,
  Sparkles,
  Shield,
  Zap,
  Calendar,
  User,
  Eye,
  Download,
  Pin,
  MessageSquare,
  Heart,
  Share2,
  ChevronDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { PostForm } from "@/components/forms/PostForm";
import { PostCard } from "@/components/shared/PostCard";

export const Posts: React.FC = () => {
  const { t } = useLanguage();
  const { posts, deletePost, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Post;
    direction: "asc" | "desc";
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleSort = (key: keyof Post) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    const matchesAudience =
      audienceFilter === "all" || post.targetAudience === audienceFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesAudience;
  });

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((p) => p.id));
    }
  };

  const toggleSelectPost = (id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedPosts.length === 0) {
      toast.error(t("posts.noPostsSelected"));
      return;
    }

    selectedPosts.forEach((id) => deletePost(id));
    setSelectedPosts([]);
    toast.success(t("posts.deletedSuccess"));
  };

  const handleDeletePost = (post: Post) => {
    deletePost(post.id);
    toast.success(t("posts.postDeleted"));
  };

  const handlePostSave = (post: Post) => {
    setEditPost(null);
    setIsCreateDialogOpen(false);
    toast.success(
      post.id ? t("postForm.postUpdated") : t("postForm.postCreated")
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "draft":
        return "bg-gradient-to-r from-amber-500 to-orange-500";
      case "archived":
        return "bg-gradient-to-r from-slate-500 to-slate-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "announcement":
        return "bg-blue-500";
      case "lesson":
        return "bg-green-500";
      case "event":
        return "bg-purple-500";
      case "general":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case "all":
        return "bg-green-500";
      case "students":
        return "bg-amber-500";
      case "teachers":
        return "bg-indigo-500";
      case "parents":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const exportPosts = () => {
    const data = filteredPosts.map((post) => ({
      Title: post.title,
      Author: post.author,
      Category: post.category,
      Status: post.status,
      "Publish Date": post.publishDate,
      Likes: post.likes.length,
      Comments: post.comments.length,
      Shares: post.shares,
      Audience: post.targetAudience,
    }));

    console.log("Exporting posts:", data);
    toast.success(t("posts.exportSuccess"));
  };

  const categories = [...new Set(posts.map((post) => post.category))];
  const audiences = [...new Set(posts.map((post) => post.targetAudience))];
  const statuses = [...new Set(posts.map((post) => post.status))];

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t("posts.justNow");
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)}${t("posts.minutesAgo")}`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}${t("posts.hoursAgo")}`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}${t("posts.daysAgo")}`;
    return date.toLocaleDateString();
  };

  const getTranslatedCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      announcement: t("postForm.categories.announcement"),
      lesson: t("postForm.categories.lesson"),
      event: t("postForm.categories.event"),
      general: t("postForm.categories.general"),
    };
    return categoryMap[category] || category;
  };

  const getTranslatedAudience = (audience: string) => {
    const audienceMap: Record<string, string> = {
      all: t("postForm.audience.all"),
      students: t("postForm.audience.students"),
      teachers: t("postForm.audience.teachers"),
      parents: t("postForm.audience.parents"),
    };
    return audienceMap[audience] || audience;
  };

  const getTranslatedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: t("postForm.statuses.draft"),
      published: t("postForm.statuses.published"),
      archived: t("postForm.statuses.archived"),
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800 via-purple-900 to-pink-900 p-6 sm:p-8 text-white border border-purple-500/20 max-w-full">
        <div className="relative z-10 max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 max-w-full">
            <div className="flex-1 min-w-0 max-w-full">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 max-w-full">
                <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl sm:rounded-2xl border border-purple-400/30 flex-shrink-0">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0 max-w-full">
                  <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent break-words max-w-full">
                    {t("posts.manage")}
                  </h1>
                  <p className="text-purple-100 text-sm sm:text-lg mt-1 sm:mt-2 break-words max-w-full">
                    {t("posts.overview")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="overflow-x-auto max-w-full">
                <div className="flex gap-3 sm:gap-6 mt-4 sm:mt-6 min-w-max pb-2 max-w-full">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-shrink-0 max-w-full">
                    <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
                    <div className="min-w-0 max-w-full">
                      <p className="text-lg sm:text-2xl font-bold truncate max-w-full">
                        {posts.length}
                      </p>
                      <p className="text-xs text-purple-200 truncate max-w-full">
                        {t("posts.totalPosts")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-shrink-0 max-w-full">
                    <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-pink-400 flex-shrink-0" />
                    <div className="min-w-0 max-w-full">
                      <p className="text-lg sm:text-2xl font-bold truncate max-w-full">
                        {posts.filter((p) => p.status === "published").length}
                      </p>
                      <p className="text-xs text-pink-200 truncate max-w-full">
                        {t("posts.published")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-shrink-0 max-w-full">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400 flex-shrink-0" />
                    <div className="min-w-0 max-w-full">
                      <p className="text-lg sm:text-2xl font-bold truncate max-w-full">
                        {posts.filter((p) => p.isPinned).length}
                      </p>
                      <p className="text-xs text-emerald-200 truncate max-w-full">
                        {t("posts.pinned")}
                      </p>
                    </div>
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
      <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-full">
          <div className="flex-1 flex flex-col sm:flex-row gap-3 max-w-full">
            <div className="relative flex-1 sm:max-w-sm max-w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder={t("common.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all duration-300 w-full max-w-full"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="sm:hidden max-w-full">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center gap-2 border-slate-300 dark:border-slate-600 max-w-full"
              >
                <Filter className="h-4 w-4" />
                {t("common.filter")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 max-w-full overflow-x-auto">
            <div className="hidden sm:flex gap-2 max-w-full">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm max-w-full"
              >
                <option value="all">{t("posts.allStatus")}</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {getTranslatedStatus(status)}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm max-w-full"
              >
                <option value="all">{t("posts.allCategories")}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {getTranslatedCategory(category)}
                  </option>
                ))}
              </select>

              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm max-w-full"
              >
                <option value="all">{t("posts.allAudiences")}</option>
                {audiences.map((audience) => (
                  <option key={audience} value={audience}>
                    {getTranslatedAudience(audience)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 max-w-full">
              <button
                onClick={() => setViewMode("table")}
                className={`px-2 sm:px-3 py-1 rounded-lg transition-all duration-300 text-xs sm:text-sm max-w-full ${
                  viewMode === "table"
                    ? "bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t("posts.tableView")}
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-2 sm:px-3 py-1 rounded-lg transition-all duration-300 text-xs sm:text-sm max-w-full ${
                  viewMode === "card"
                    ? "bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t("posts.cardView")}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden grid grid-cols-1 gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 max-w-full overflow-x-hidden">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm w-full max-w-full"
            >
              <option value="all">{t("posts.allStatus")}</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {getTranslatedStatus(status)}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm w-full max-w-full"
            >
              <option value="all">{t("posts.allCategories")}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {getTranslatedCategory(category)}
                </option>
              ))}
            </select>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm w-full max-w-full"
            >
              <option value="all">{t("posts.allAudiences")}</option>
              {audiences.map((audience) => (
                <option key={audience} value={audience}>
                  {getTranslatedAudience(audience)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 max-w-full overflow-x-hidden">
          <div className="flex gap-3 max-w-full overflow-x-auto">
            <Button
              variant="outline"
              onClick={exportPosts}
              className="flex items-center gap-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex-1 sm:flex-none max-w-full"
            >
              <Download className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">
                {t("posts.exportPosts")}
              </span>
            </Button>

            {selectedPosts.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-none max-w-full"
              >
                <Trash2 className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {t("common.delete")} ({selectedPosts.length})
                </span>
              </Button>
            )}
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex-1 sm:flex-none max-w-full">
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{t("posts.createNew")}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] mx-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 max-w-full">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{t("postForm.createTitle")}</span>
                </DialogTitle>
              </DialogHeader>
              <PostForm
                mode="create"
                onSave={handlePostSave}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Posts Display */}
      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border-0 shadow-xl sm:shadow-2xl overflow-hidden max-w-full">
          <div className="overflow-x-auto max-w-full">
            <Table className="max-w-full">
              <TableHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 max-w-full">
                <TableRow className="border-b border-slate-200 dark:border-slate-700 max-w-full">
                  <TableHead className="w-12 bg-transparent px-2 sm:px-4 max-w-full">
                    <Checkbox
                      checked={
                        selectedPosts.length === filteredPosts.length &&
                        filteredPosts.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 px-2 sm:px-4 min-w-[200px] max-w-full"
                    onClick={() => handleSort("title")}
                  >
                    <span className="truncate block">{t("posts.title")}</span>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[150px] max-w-full">
                    <span className="truncate block">{t("posts.author")}</span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[120px] max-w-full">
                    <span className="truncate block">
                      {t("posts.category")}
                    </span>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[120px] max-w-full">
                    <span className="truncate block">
                      {t("posts.audience")}
                    </span>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[140px] max-w-full">
                    <span className="truncate block">
                      {t("posts.engagement")}
                    </span>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer bg-transparent text-slate-800 dark:text-white font-semibold py-4 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 px-2 sm:px-4 min-w-[100px] max-w-full"
                    onClick={() => handleSort("publishDate")}
                  >
                    <span className="truncate block">{t("posts.date")}</span>
                  </TableHead>
                  <TableHead className="bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[100px] max-w-full">
                    <span className="truncate block">{t("common.status")}</span>
                  </TableHead>
                  <TableHead className="text-right bg-transparent text-slate-800 dark:text-white font-semibold py-4 px-2 sm:px-4 min-w-[120px] max-w-full">
                    <span className="truncate block">
                      {t("common.actions")}
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-w-full">
                {filteredPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 group max-w-full"
                  >
                    <TableCell className="py-4 px-2 sm:px-4 max-w-full">
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onCheckedChange={() => toggleSelectPost(post.id)}
                        className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                    </TableCell>
                    <TableCell className="py-4 px-2 sm:px-4 max-w-full">
                      <div className="flex items-center gap-2 sm:gap-3 max-w-full">
                        {post.isPinned && (
                          <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1 max-w-full">
                          <p className="font-semibold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm sm:text-base truncate max-w-full">
                            {post.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 hidden sm:block truncate max-w-full">
                            {post.content.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-4 px-2 sm:px-4 max-w-full">
                      <div className="flex items-center gap-2 max-w-full">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-slate-700 dark:text-slate-300 text-sm truncate min-w-0 max-w-full">
                          {post.author}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-4 px-2 sm:px-4 max-w-full">
                      <div className="min-w-0 max-w-full">
                        <Badge
                          className={`rounded-lg font-medium shadow-sm text-white text-xs truncate max-w-full ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {getTranslatedCategory(post.category)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell py-4 px-2 sm:px-4 max-w-full">
                      <div className="min-w-0 max-w-full">
                        <Badge
                          variant="outline"
                          className={`rounded-lg font-medium text-xs truncate max-w-full ${getAudienceColor(
                            post.targetAudience
                          )} text-white border-0`}
                        >
                          {getTranslatedAudience(post.targetAudience)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4 px-2 sm:px-4 max-w-full">
                      <div className="flex items-center gap-2 sm:gap-4 text-xs text-slate-600 dark:text-slate-400 max-w-full">
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Heart className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{post.likes.length}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <MessageSquare className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">
                            {post.comments.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Share2 className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{post.shares}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-slate-700 dark:text-slate-300 text-sm px-2 sm:px-4 max-w-full">
                      <span className="truncate block max-w-full">
                        {getTimeAgo(post.publishDate)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-2 sm:px-4 max-w-full">
                      <div className="min-w-0 max-w-full">
                        <Badge
                          className={`rounded-lg font-medium shadow-sm text-white text-xs truncate max-w-full ${getStatusColor(
                            post.status
                          )}`}
                        >
                          {getTranslatedStatus(post.status)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right px-2 sm:px-4 max-w-full">
                      <div className="flex justify-end gap-1 sm:gap-2 max-w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewPost(post)}
                          className="h-8 w-8 sm:h-9 sm:w-9 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-0 flex-shrink-0"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditPost(post)}
                          className="h-8 w-8 sm:h-9 sm:w-9 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-0 flex-shrink-0"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post)}
                          className="h-8 w-8 sm:h-9 sm:w-9 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-0 flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Premium Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-16 max-w-full overflow-x-hidden">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium mb-2 max-w-full">
                {t("posts.noPostsFound")}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 max-w-full">
                {searchTerm
                  ? t("posts.tryAdjustingSearch")
                  : t("posts.noPostsAvailable")}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Card View */
        <div className="space-y-4 sm:space-y-6 max-w-full overflow-x-hidden">
          {filteredPosts.map((post) => (
            <div key={post.id} className="max-w-full overflow-x-hidden">
              <PostCard
                post={post}
                onUpdate={handlePostSave}
                showActions={false}
              />
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-16 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden max-w-full">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium mb-2 max-w-full">
                {t("posts.noPostsFound")}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 max-w-full">
                {searchTerm
                  ? t("posts.tryAdjustingSearch")
                  : t("posts.noPostsAvailable")}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Detail Dialog */}
      <Dialog open={!!viewPost} onOpenChange={() => setViewPost(null)}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-2xl rounded-2xl sm:rounded-3xl mx-4 overflow-hidden w-[95vw]">
          {viewPost && (
            <PostCard
              post={viewPost}
              onUpdate={handlePostSave}
              showActions={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={!!editPost} onOpenChange={() => setEditPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 max-w-full">
              <Edit className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{t("postForm.editTitle")}</span>
            </DialogTitle>
          </DialogHeader>
          {editPost && (
            <PostForm
              post={editPost}
              mode="edit"
              onSave={handlePostSave}
              onCancel={() => setEditPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
