"use client";
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/lib';
import { signinLinks } from './navSchema';
const SigninNav = () => {
    const path = usePathname()
    return (
        <nav className='flex items-center justify-around px-6 py-3 bg-white'>
            <div className='flex items-center '>
                <Image
                    src={Logo}
                    width={128}
                    height={32}
                    alt='A2SV logo'
                />
            </div>

            <div className='flex gap-6'>
                {signinLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`relative px-2 py-1 hover:text-oxford-blue ${path.startsWith(link.name) ? "text-purple-light " : "text-pale-sky"}`}

                    >
                        {link.name}
                        {path.startsWith(link.name) && (
                            <span className='bg-purple-light absolute -bottom-1 left-0 right-0 h-0.5 rounded' />
                        )}
                    </Link>
                ))}
            </div>
            {/* <div className='flex items-center gap-4'>
                <Link href="/" className='text-sm hover:underline'>Your Profile</Link>
                <div className='text-sm'>Admin User</div>
                <button>Logout</button>
            </div> */}
        </nav>
    )
}

export default SigninNav