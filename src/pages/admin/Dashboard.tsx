import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '234',
      icon: Users,
      trend: '+12%',
      color: 'text-secondary',
    },
    {
      title: 'Total Assets',
      value: '89',
      icon: Package,
      trend: '+5%',
      color: 'text-primary',
    },
    {
      title: 'Active Posts',
      value: '45',
      icon: FileText,
      trend: '+8%',
      color: 'text-accent',
    },
    {
      title: 'Engagement Rate',
      value: '87%',
      icon: TrendingUp,
      trend: '+3%',
      color: 'text-secondary',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your Sunday School management system
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
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
              { action: 'Asset updated', user: 'Admin', time: '5 hours ago' },
              { action: 'New post published', user: 'Admin', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
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
    </div>
  );
}
