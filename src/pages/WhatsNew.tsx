import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LogOut, MessageCircle, Share2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function WhatsNew() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const posts = [
    {
      id: '1',
      title: 'Welcome to the New Sunday School Portal',
      author: 'Admin',
      date: '2024-01-15',
      content: 'We are excited to announce the launch of our new Sunday School management portal. This platform will help us stay connected, manage our activities, and grow together in faith.',
      comments: [
        { id: '1', author: 'John Doe', text: 'This looks amazing! Thank you for building this.', date: '2024-01-15' }
      ]
    },
    {
      id: '2',
      title: 'Upcoming Feast Day Celebration',
      author: 'Admin',
      date: '2024-01-14',
      content: 'Join us next Sunday for a special celebration of our feast day. We will have special prayers, liturgy, and fellowship afterwards.',
      comments: []
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleComment = (postId: string) => {
    if (commentText[postId]?.trim()) {
      toast.success('Comment added successfully!');
      setCommentText(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="font-logo text-2xl text-primary">Sunday School</h1>
            <p className="text-sm text-muted-foreground">Community Feed</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.firstName} {user?.lastName}</span>
            <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
              Profile
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Feed Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">What's New</h2>
            <p className="text-muted-foreground mt-2">
              Stay updated with the latest announcements and community news
            </p>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="eotc-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground">{post.content}</p>

                  {/* Engagement Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Comment ({post.comments.length})
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-muted rounded-lg p-3">
                            <p className="font-medium text-sm">{comment.author}</p>
                            <p className="text-sm mt-1">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex gap-3 pt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        placeholder="Write a comment..."
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                        className="min-h-[60px]"
                      />
                      <Button
                        onClick={() => handleComment(post.id)}
                        className="bg-primary"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
