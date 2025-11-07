import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Update Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>About Me</Label>
                    <Textarea
                      rows={4}
                      value={profileData.aboutMe}
                      onChange={(e) => updateField('aboutMe', e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSave} className="bg-primary">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>Location & Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={profileData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={profileData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <Input
                      value={profileData.occupation}
                      onChange={(e) => updateField('occupation', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Education</Label>
                    <Textarea
                      rows={3}
                      value={profileData.education}
                      onChange={(e) => updateField('education', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sunday School</Label>
                    <Input
                      value={profileData.sundaySchool}
                      onChange={(e) => updateField('sundaySchool', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Responsibility</Label>
                    <Input
                      value={profileData.responsibility}
                      onChange={(e) => updateField('responsibility', e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSave} className="bg-primary">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="eotc-card">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </div>

                  <Button onClick={handleSave} className="bg-primary">
                    Update Password
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
