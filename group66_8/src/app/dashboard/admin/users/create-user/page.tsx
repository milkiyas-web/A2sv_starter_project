    'use client';

    import { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

    export default function CreateUserPage() {
        const [formData, setFormData] = useState({
            fullName: '',
            email: '',
            password: '',
            role: ''
        });

        const [errors, setErrors] = useState({
            fullName: '',
            email: '',
            password: '',
            role: ''
        });

        const handleInputChange = (field: string, value: string) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));

            // Clear error when user starts typing
            if (errors[field as keyof typeof errors]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: ''
                }));
            }
        };

        const validateForm = () => {
            const newErrors = {
                fullName: '',
                email: '',
                password: '',
                role: ''
            };

            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Full name is required';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email address is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            if (!formData.password.trim()) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }

            if (!formData.role) {
                newErrors.role = 'Role selection is required';
            }

            setErrors(newErrors);
            return !Object.values(newErrors).some(error => error !== '');
        };

   const handleSaveUser = async () => {
    if (!validateForm()) return;

    try {
        
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        
        if (!session?.user) {
            throw new Error('Not authenticated');
        }

        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
            body: JSON.stringify({
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            }),
        });

        if (!res.ok) {
            const result = await res.json();
            throw new Error(result.message || 'Failed to create user');
        }

        const result = await res.json();
        alert('User created successfully!');
        handleCancel();
    } catch (err: any) {
        alert(err.message || 'An unexpected error occurred');
    }
};

        const handleCancel = () => {
            // Reset form or navigate back
            setFormData({
                fullName: '',
                email: '',
                password: '',
                role: ''
            });
            setErrors({
                fullName: '',
                email: '',
                password: '',
                role: ''
            });
        };

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-4">
                    <Card className="border-0 shadow-none bg-gray-50">
                        <CardHeader className="px-0 pb-8">
                            <CardTitle className="text-3xl font-bold text-gray-900">
                                Create New User
                            </CardTitle>
                            <CardDescription className="text-base text-gray-600 mt-2">
                                Use this form to create a new user and assign them a role.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className=" bg-white shadow-sm border border-gray-200">
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                        Full name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className={`h-11 ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-sm text-red-600">{errors.fullName}</p>
                                    )}
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`h-11 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`h-11 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                        placeholder="Set an initial password"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                                        Role
                                    </Label>
                                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                                        <SelectTrigger className={`h-11 ${errors.role ? 'border-red-500 focus:border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="applicant">Applicant</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="hr">Reviewer</SelectItem>
                                            <SelectItem value="employee">Employee</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-sm text-red-600">{errors.role}</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="px-6 py-2 h-10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSaveUser}
                                    className="px-6 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Save User
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }