'use client';

import React from 'react';
import { useGetCycleQuery } from '@/lib/redux/api/cycleApi';
import { useGetusersQuery } from '@/lib/redux/api/userApi';
import { Cycle } from '@/lib/redux/types/cycle';
import { CardComponent } from './CardComponent';

const AdminStats = () => {
    const { data: cycleData, isLoading: isCycleLoading } = useGetCycleQuery();
    console.log("cycledata", cycleData)
    const { data, isLoading: isUsersLoading, error } = useGetusersQuery({ page: 1, limit: 4 });

    if (isUsersLoading || isCycleLoading) {
        return (
            <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#4F46E5]" />
            </div>
        );
    }

    if (error) return <div>Error loading users</div>;

    const getTotalUsers = () => data?.data.total_count ?? 0;
    console.log("data::::", data)


    const getTotalActiveCycles = () => {
        return cycleData?.data?.cycles?.filter((cycle: Cycle) => cycle.is_active).length || 0;
    };

    const getTotalApplicants = () => {
        return data?.data.users.filter((user) => user.role === 'applicant').length ?? 0;
    };

    type StatItem = { title: string; num: number; gradient: 'purple' | 'green' | 'orange' };
    const stats: StatItem[] = [
        { title: 'Total Users', num: getTotalUsers(), gradient: 'purple' },
        { title: 'Total Applicants (G7)', num: getTotalApplicants(), gradient: 'green' },
        { title: 'Active Cycles', num: getTotalActiveCycles(), gradient: 'orange' },
    ];
    console.log(stats)

    return (
        <div className="flex justify-center py-3">
            <div className="flex flex-col items-start gap-4">
                <h1 className="text-2xl  font-bold">Admin Command Center</h1>

                <div className="flex gap-8 flex-wrap justify-center">
                    {stats.map((s, i) => (
                        <CardComponent key={i} title={s.title} description={s.num} gradient={s.gradient} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AdminStats;
