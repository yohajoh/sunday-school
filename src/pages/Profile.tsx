import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    aboutMe: '',
    address: '',
    city: '',
    country: '',
    occupation: '',
    education: '',
    sundaySchool: '',
    responsibility: '',
  });

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success(t('common.save'));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">{t('profile.personal')}</TabsTrigger>
              <TabsTrigger value="details">{t('profile.details')}</TabsTrigger>
              <TabsTrigger value="account">{t('profile.account')}</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>{t('profile.personal')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="text-2xl">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                          <Upload className="h-4 w-4" />
                          <span>{t('profile.avatar')}</span>
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('profile.firstName')}</Label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('profile.lastName')}</Label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.phone')}</Label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.aboutMe')}</Label>
                    <Textarea
                      rows={4}
                      value={profileData.aboutMe}
                      onChange={(e) => updateField('aboutMe', e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSave} className="bg-secondary">
                    {t('common.save')}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>{t('profile.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('profile.address')}</Label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('profile.city')}</Label>
                      <Input
                        value={profileData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('profile.country')}</Label>
                      <Input
                        value={profileData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.occupation')}</Label>
                    <Input
                      value={profileData.occupation}
                      onChange={(e) => updateField('occupation', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.education')}</Label>
                    <Textarea
                      rows={3}
                      value={profileData.education}
                      onChange={(e) => updateField('education', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.sundaySchool')}</Label>
                    <Input
                      value={profileData.sundaySchool}
                      onChange={(e) => updateField('sundaySchool', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.responsibility')}</Label>
                    <Input
                      value={profileData.responsibility}
                      onChange={(e) => updateField('responsibility', e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSave} className="bg-secondary">
                    {t('common.save')}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>{t('profile.account')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('profile.currentPassword')}</Label>
                    <Input type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.newPassword')}</Label>
                    <Input type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('profile.confirmPassword')}</Label>
                    <Input type="password" />
                  </div>

                  <Button onClick={handleSave} className="bg-secondary">
                    {t('common.save')}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
