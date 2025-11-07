import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-church.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      
      // Role-based redirect handled by App routing
      if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/whats-new');
      }
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header with controls */}
        <div className="flex justify-end items-center gap-2 p-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Login Form Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
              <h1 className="font-logo text-5xl text-primary mb-2">
                Sunday School
              </h1>
              <p className="text-sm text-muted-foreground">
                Ethiopian Orthodox Tewahedo Church
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : t('auth.login')}
              </Button>

              <div className="text-center space-y-2 text-sm">
                <Link to="/forgot-password" className="text-primary hover:underline block">
                  Forgot Password?
                </Link>
                <div>
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign Up
                  </Link>
                </div>
              </div>

              <div className="text-xs text-center text-muted-foreground pt-4 border-t">
                <p>Demo: Use admin@church.org (admin) or user@church.org (user)</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
        
        {/* Overlay Content */}
        <div className="relative h-full flex items-end p-12">
          <div className="text-white space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold font-ethiopic">
              {t('auth.welcome')}
            </h2>
            <p className="text-lg text-white/90">
              Access your Sunday School community, manage your profile, stay connected with announcements, and grow in faith together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
