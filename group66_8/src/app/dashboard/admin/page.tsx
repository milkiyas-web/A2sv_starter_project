import { BigCardComponents } from '@/app/dashboard/admin/_components/CardComponent'
import React from 'react'
import AdminStats from './_components/AdminStats'
import { title } from 'process'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'


const bigCardData = [
    {
        title: "Manage Users",
        description: "Create, edit, and manage user accounts and roles.",
        footer: "Go to Users",
        link: "users"
    },
    {
        title: "Manage Cycles",
        description: "Create and manage application cycles.",
        footer: "Go to Cycles",
        link: "/cycles"
    },
    {
        title: "Recent Admin Activity",
        description: "Create and manage application cycles.",
        footer: "New User Jane R. created.",
        link: ""
    }
]

const page = () => {
    return (
        <div className='bg-gray-background' >
            <AdminStats />
            <div className='flex gap-8 py-3 justify-center flex-wrap'>
                {bigCardData.map((card, i) => (
                    <BigCardComponents
                        key={i}
                        title={card.title}
                        description={card.description}
                        footer={card.footer}
                        link={card.link}

                    />
                ))}
            </div>

            <div className='flex py-6 justify-center'>
                <Card className="w-[765px] py-3 h-[169px] shadow-2xl">
                    <CardHeader>
                        <h2 className="font-bold text-xl">View Analytics</h2>
                        <CardDescription className="text-[#4B5563] text-base">
                            Explore application data and platform insights.
                        </CardDescription>
                        <Link href={`/dashboard/admin/analytics`}>
                            <div className="flex text-[#4F46E5] items-center gap-1 text-sm  mt-2">
                                <p className='hover:underline'>Go to Analytics</p>
                                <ArrowRight className="w-4 h-4 " />
                            </div>
                        </Link>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default page