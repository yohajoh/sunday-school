import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, FileText, TrendingUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Dashboard() {
  const { t } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const stats = [
    {
      title: t('dashboard.totalUsers'),
      value: '234',
      icon: Users,
      trend: '+12%',
      color: 'text-secondary',
    },
    {
      title: t('dashboard.totalAssets'),
      value: '89',
      icon: Package,
      trend: '+5%',
      color: 'text-secondary',
    },
    {
      title: t('dashboard.activePosts'),
      value: '45',
      icon: FileText,
      trend: '+8%',
      color: 'text-accent',
    },
    {
      title: t('dashboard.engagement'),
      value: '87%',
      icon: TrendingUp,
      trend: '+3%',
      color: 'text-secondary',
    },
  ];

  const activities = [
    { id: 1, action: 'New user registered', user: 'John Doe', email: 'john@church.org', time: '2 hours ago', details: 'Completed registration with all required information.' },
    { id: 2, action: 'Asset updated', user: 'Admin', email: 'admin@church.org', time: '5 hours ago', details: 'Updated asset BK-001 status to Available.' },
    { id: 3, action: 'New post published', user: 'Admin', email: 'admin@church.org', time: '1 day ago', details: 'Published "Welcome to Sunday School Portal"' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('nav.dashboard')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('dashboard.overview')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="eotc-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-secondary mt-1">
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="eotc-card">
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-muted/50 px-2 rounded transition-colors"
                onClick={() => setSelectedActivity(activity)}
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Detail Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Action</p>
                <p className="font-medium">{selectedActivity.action}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-medium">{selectedActivity.user}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedActivity.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{selectedActivity.time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Details</p>
                <p className="font-medium">{selectedActivity.details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
