// app/users/[id]/edit/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-semibold mb-6">Edit User: {formData.fullName}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full mt-1 border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Set a new password (optional)"
            className="w-full mt-1 border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Applicant">Applicant</option>
          </select>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Update User
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Delete User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
