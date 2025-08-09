// app/users/[id]/edit/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Reviewer',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          if (res.status === 401) toast.error('You are not authenticated');
          else if (res.status === 403) toast.error('You do not have permission to view this user');
          else toast.error('Failed to load user');
          return;
        }
        const user = await res.json();
        setFormData({
          fullName: user.fullName,
          email: user.email,
          password: '',
          role: user.role,
        });
      } catch (e) {
        toast.error('Network error while loading user');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        if (res.status === 401) toast.error('You are not authenticated');
        else if (res.status === 403) toast.error('You do not have permission to update this user');
        else toast.error('Failed to update user');
        return;
      }
      toast.success('User updated successfully');
      router.push('/users');
    } catch (e) {
      toast.error('Network error while updating user');
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        if (res.status === 401) toast.error('You are not authenticated');
        else if (res.status === 403) toast.error('You do not have permission to delete this user');
        else toast.error('Failed to delete user');
        return;
      }
      toast.success('User deleted successfully');
      router.push('/users');
    } catch (e) {
      toast.error('Network error while deleting user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <Card className="border-0 shadow-none bg-gray-50">
          <CardHeader className="px-0 pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Edit User: {formData.fullName || '—'}
            </CardTitle>
            <CardDescription className="text-base text-gray-600 mt-2">
              Update the user's information and role.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className=" bg-white shadow-sm border border-gray-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-11"
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  className="h-11 bg-gray-100"
                  placeholder="Email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11"
                  placeholder="Set a new password (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applicant">Applicant</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Reviewer">Reviewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="px-6 py-2 h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 h-10 bg-[#4F46E5] hover:bg-blue-700 text-white"
                >
                  Update User
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 h-10 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
