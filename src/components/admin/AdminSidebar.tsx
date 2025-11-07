import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/admin/users', icon: Users, label: t('nav.users') },
    { to: '/admin/assets', icon: Package, label: 'Manage Assets' },
    { to: '/admin/posts', icon: FileText, label: 'Post News' },
  ];

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
            activeClassName="bg-primary text-primary-foreground"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
