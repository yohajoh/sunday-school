import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  FileText,
  Sparkles,
  MessageSquare,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Posts() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Welcome to Sunday School Portal",
      content:
        "We are excited to announce the launch of our new Sunday School Portal. This platform will help us better manage our activities, resources, and communication with all members.",
      author: "Admin",
      date: "2024-01-15",
      status: "Published",
    },
    {
      id: "2",
      title: "Upcoming Feast Day Celebration",
      content:
        "Join us for our annual feast day celebration this coming Sunday. We have special activities planned for all age groups, including children's programs and community gatherings.",
      author: "Admin",
      date: "2024-01-14",
      status: "Published",
    },
  ]);

  const PostFormDialog = ({ post }: { post?: (typeof posts)[0] }) => {
    const [formData, setFormData] = useState(
      post || {
        title: "",
        content: "",
        author: "Admin",
        date: new Date().toISOString().split("T")[0],
        status: "Draft",
      }
    );

    const handleSubmit = () => {
      if (post) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, ...formData } : p))
        );
        toast.success("Post updated successfully");
      } else {
        setPosts((prev) => [
          ...prev,
          { id: Date.now().toString(), ...formData },
        ]);
        toast.success("Post created successfully");
      }
    };

    return (
      <DialogContent className="max-w-4xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="border-b border-slate-200 dark:border-slate-700 pb-4">
          <DialogTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl">
              <FileText className="h-5 w-5 text-white" />
            </div>
            {post ? t("common.edit") : t("posts.createNew")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("posts.title")}
            </Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              placeholder="Enter post title..."
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("posts.content")}
            </Label>
            <Textarea
              rows={12}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none rounded-xl transition-all duration-300"
              placeholder="Write your post content here..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </Label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Publish Date
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-300"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {post ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="space-y-8 p-6">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-violet-900 p-8 text-white border border-blue-500/20">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">
                    {t("posts.manage")}
                  </h1>
                  <p className="text-blue-100 text-lg mt-2">
                    {t("posts.overview")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold">{posts.length}</p>
                    <p className="text-xs text-blue-200">Total Posts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Zap className="h-6 w-6 text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {posts.filter((p) => p.status === "Published").length}
                    </p>
                    <p className="text-xs text-violet-200">Published</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold">
                      {posts.filter((p) => p.status === "Draft").length}
                    </p>
                    <p className="text-xs text-emerald-200">Drafts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {posts.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total Posts
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4" />
                {t("posts.createNew")}
              </Button>
            </DialogTrigger>
            <PostFormDialog />
          </Dialog>
        </div>
      </div>

      {/* Premium Posts Grid */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="border-0 bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl group"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    <Badge
                      className={`rounded-lg font-medium shadow-sm ${
                        post.status === "Published"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : post.status === "Draft"
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                          : "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
                      }`}
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-3 py-1">
                      <User className="h-4 w-4" />
                      <span>
                        {t("posts.author")}:{" "}
                        <strong className="text-slate-800 dark:text-slate-200">
                          {post.author}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-3 py-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t("posts.date")}:{" "}
                        <strong className="text-slate-800 dark:text-slate-200">
                          {new Date(post.date).toLocaleDateString()}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <PostFormDialog post={post} />
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPosts((prev) => prev.filter((p) => p.id !== post.id));
                      toast.success("Post deleted");
                    }}
                    className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-slate-200 dark:border-slate-600">
                <div className="p-2 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {post.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-20">
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-3xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            No posts yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 max-w-md mx-auto">
            Get started by creating your first post to share with the community.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3">
                <Plus className="h-5 w-5 mr-3" />
                Create Your First Post
              </Button>
            </DialogTrigger>
            <PostFormDialog />
          </Dialog>
        </div>
      )}
    </div>
  );
}
