import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Posts() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([
    { id: '1', title: 'Welcome to Sunday School Portal', content: 'We are excited to announce...', author: 'Admin', date: '2024-01-15' },
    { id: '2', title: 'Upcoming Feast Day', content: 'Join us for celebration...', author: 'Admin', date: '2024-01-14' },
  ]);

  const PostFormDialog = ({ post }: { post?: typeof posts[0] }) => {
    const [formData, setFormData] = useState(post || { title: '', content: '', author: 'Admin', date: new Date().toISOString().split('T')[0] });

    const handleSubmit = () => {
      if (post) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, ...formData } : p));
        toast.success('Post updated successfully');
      } else {
        setPosts(prev => [...prev, { id: Date.now().toString(), ...formData }]);
        toast.success('Post created successfully');
      }
    };

    return (
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post ? t('common.edit') : t('posts.createNew')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t('posts.title')}</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>{t('posts.content')}</Label>
            <Textarea rows={8} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
          </div>
          <Button onClick={handleSubmit} className="bg-secondary">{t('common.save')}</Button>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('posts.manage')}</h1>
          <p className="text-muted-foreground mt-2">{t('posts.overview')}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-secondary">
              <Plus className="h-4 w-4 mr-2" />
              {t('posts.createNew')}
            </Button>
          </DialogTrigger>
          <PostFormDialog />
        </Dialog>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="eotc-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('posts.author')}: {post.author} • {t('posts.date')}: {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <PostFormDialog post={post} />
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => {
                    setPosts(prev => prev.filter(p => p.id !== post.id));
                    toast.success('Post deleted');
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
