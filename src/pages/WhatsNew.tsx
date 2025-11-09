import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LogOut,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  User,
  Bell,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function WhatsNew() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Welcome to the New Sunday School Portal",
      author: "Admin",
      date: "2024-01-15",
      content:
        "We are excited to announce the launch of our new Sunday School management portal. This platform will help us stay connected, manage our activities, and grow together in faith. You can now access your profile, view announcements, and interact with the community.",
      comments: [
        {
          id: "1",
          author: "John Doe",
          text: "This looks amazing! Thank you for building this platform for our community.",
          date: "2024-01-15",
          likes: 2,
        },
        {
          id: "2",
          author: "Sarah Smith",
          text: "Great initiative! Looking forward to using this with our Sunday School class.",
          date: "2024-01-15",
          likes: 1,
        },
      ],
      likes: 15,
      shares: 3,
    },
    {
      id: "2",
      title: "Upcoming Feast Day Celebration",
      author: "Admin",
      date: "2024-01-14",
      content:
        "Join us next Sunday for a special celebration of our feast day. We will have special prayers, liturgy, and fellowship afterwards. All members are encouraged to participate and bring their families.",
      comments: [],
      likes: 8,
      shares: 1,
    },
    {
      id: "3",
      title: "New Bible Study Series Starting Next Month",
      author: "Pastor Michael",
      date: "2024-01-13",
      content:
        "We are launching a new Bible study series focusing on the Gospel of John. The series will run every Wednesday evening starting February 1st. Please register with your Sunday School teachers.",
      comments: [
        {
          id: "3",
          author: "David Johnson",
          text: "Looking forward to this study! The Gospel of John has always been my favorite.",
          date: "2024-01-13",
          likes: 0,
        },
      ],
      likes: 12,
      shares: 2,
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (text) {
      // Create new comment
      const newComment = {
        id: Date.now().toString(),
        author: `${user?.firstName} ${user?.lastName}`,
        text: text,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      };

      // Update posts state to add the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, newComment],
              }
            : post
        )
      );

      // Clear the comment text
      setCommentText((prev) => ({ ...prev, [postId]: "" }));

      toast.success("Comment added successfully!");
    } else {
      toast.error("Please write a comment before posting.");
    }
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      {/* Premium Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-logo text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Sunday School
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Community Feed
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Member
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/profile")}
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
            >
              Profile
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Premium Feed Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
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
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">
                        What's New
                      </h2>
                      <p className="text-blue-100 text-lg mt-2">
                        Stay updated with the latest announcements and community
                        news
                      </p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                      <div>
                        <p className="text-2xl font-bold">{posts.length}</p>
                        <p className="text-xs text-blue-200">Active Posts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <Users className="h-6 w-6 text-violet-400" />
                      <div>
                        <p className="text-2xl font-bold">
                          {posts.reduce(
                            (sum, post) => sum + post.comments.length,
                            0
                          )}
                        </p>
                        <p className="text-xs text-violet-200">
                          Total Comments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <Sparkles className="h-6 w-6 text-emerald-400" />
                      <div>
                        <p className="text-2xl font-bold">
                          {posts.reduce((sum, post) => sum + post.likes, 0)}
                        </p>
                        <p className="text-xs text-emerald-200">
                          Community Likes
                        </p>
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

          {/* Premium Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="border-0 bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold">
                          {post.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-xl text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-2">
                          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-3 py-1">
                            <User className="h-3 w-3" />
                            <span className="font-medium">
                              By {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-3 py-1">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {post.content}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-2">
                    <span className="font-semibold">{post.likes} likes</span>
                    <span>•</span>
                    <span className="font-semibold">
                      {post.comments.length} comments
                    </span>
                    <span>•</span>
                    <span className="font-semibold">{post.shares} shares</span>
                  </div>

                  {/* Premium Engagement Actions */}
                  <div className="flex items-center gap-1 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-3 flex-1 rounded-xl transition-all duration-300 ${
                        likedPosts.has(post.id)
                          ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      }`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedPosts.has(post.id) ? "fill-current" : ""
                        }`}
                      />
                      Like
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-3 flex-1 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Comment ({post.comments.length})
                      {expandedComments.has(post.id) ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-3 flex-1 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </Button>
                  </div>

                  {/* Premium Comments Section - Toggleable */}
                  {expandedComments.has(post.id) && (
                    <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      {/* Existing Comments */}
                      {post.comments.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-800 dark:text-white text-lg">
                            Comments
                          </h4>
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                              <Avatar className="h-10 w-10 flex-shrink-0 shadow-md">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-slate-700 dark:text-slate-300 font-semibold">
                                  {comment.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-slate-50 dark:bg-slate-700/30 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-slate-800 dark:text-white">
                                    {comment.author}
                                  </p>
                                  <span className="text-sm text-slate-500 dark:text-slate-400">
                                    {new Date(
                                      comment.date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mt-2">
                                  {comment.text}
                                </p>
                                {comment.likes > 0 && (
                                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500 dark:text-slate-400">
                                    <Heart className="h-4 w-4" />
                                    <span>{comment.likes}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Premium Add Comment */}
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0 shadow-md">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-3">
                          <Textarea
                            placeholder="Write a comment..."
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            className="min-h-[80px] bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none rounded-xl transition-all duration-300"
                          />
                          <Button
                            onClick={() => handleComment(post.id)}
                            className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white self-end rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
