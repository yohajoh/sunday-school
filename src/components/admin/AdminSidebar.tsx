import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/admin/users', icon: Users, label: t('nav.users') },
    { to: '/signup', icon: UserPlus, label: t('nav.addUser') },
    { to: '/admin/assets', icon: Package, label: t('nav.assets') },
    { to: '/admin/posts', icon: FileText, label: t('nav.posts') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'border-r bg-card transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-end border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent',
              collapsed && 'justify-center'
            )}
            activeClassName="bg-secondary text-secondary-foreground"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            'w-full justify-start gap-3 hover:bg-destructive hover:text-destructive-foreground',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>{t('auth.logout')}</span>}
        </Button>
      </div>
    </aside>
  );
};
