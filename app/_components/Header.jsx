"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Header = () => {
    const MenuList = [{
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact Us',
        path: '/contact-us'
    }]
    const { isSignedIn } = useUser();
    return (
        <div className='p-4 flex justify-between shadow'>
            <div className='flex '>
                <Image src="/logo.svg" alt="Menu" className='' width={24} height={24} />
                <span className='font-bold text-xl'>Think & Build</span>
            </div>
            <div className='flex gap-2 '>
                {MenuList.map((item, index) => (
                    <ul className='flex gap-6' key={index}>
                        <li className='list-none'>
                            <Button variant="outline">{item.name}</Button>
                        </li>
                    </ul>
                ))}
            </div>
            <div className='flex'>
                {!isSignedIn ? (
                    <></>
                ) : (
                <Link href="/workspace">
                    <Button>Get Started</Button>
                </Link>
                )}

                {!isSignedIn ? (
                    <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                    </SignInButton>
                ) : (
                    <UserButton />
                )}
            </div>

        </div>
    )
}
