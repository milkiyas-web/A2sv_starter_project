
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

type CardProps = {
    description?: string | number;
    title?: string;
    gradient?: 'purple' | 'green' | 'orange';
};
type BigCardDataTypes = {
    title: string;
    description: string;
    footer: string;
    link: string;
}

const gradientMap = {
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-400 to-orange-600',
};

export const CardComponent = ({ description, title, gradient = 'purple' }: CardProps) => {
    return (
        <div
            className={`w-[390px] h-[100px] rounded-xl shadow-md px-6 py-4 bg-gradient-to-br text-white flex flex-col justify-between ${gradientMap[gradient]} shadow-2xl`}
        >
            <h2 className="text-sm font-medium">{title}</h2>
            <p className="text-3xl font-bold">{description}</p>
        </div>
    );
};

export const BigCardComponents = ({ description, title, footer, link }: BigCardDataTypes) => {
    return (
        <Card className="w-[384px] h-[384px] shadow-2xl">
            <CardHeader>
                <h2 className="font-bold text-xl">{title}</h2>
                <CardDescription className="text-[#4B5563] text-base">
                    {description}
                </CardDescription>

                {link && (
                    <Link href={`/dashboard/admin/${link}`}>
                        <div className="flex text-[#4F46E5] items-center gap-1 text-sm  mt-2">
                            <p className='hover:underline'>{footer}</p>
                            <ArrowRight className="w-4 h-4 " />
                        </div>
                    </Link>
                )}
            </CardHeader>
        </Card>
    )

}

