"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
// import { SignInButton, useUser } from '@clerk/nextjs'
import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
const Hero = () => {
    const suggestion = [
        {
            label: 'Dashboard',
            prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',

        },
        {
            label: 'SignUp Form',
            prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',

        },
        {
            label: 'Hero',
            prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof and an image.',

        },
        {
            label: 'User Profile Card',
            prompt: 'Create a modern user profile card component for a social media website',

        }
    ]
    const [userinput, setUserinput] = useState("")
    const { isSignedIn } = useUser();

    // const submit = () => {
    //     console.log(isSignedIn);

    //     if (isSignedIn) { router.push('/workspace') }
    // }

    return (
        <div className='flex h-[80vh] justify-center'>
            <div className=' flex flex-col content-center justify-center '>
                <div className='flex justify-center'>

                    <span className='font-bold text-6xl'>Think & Build</span>
                </div>
                <div className='flex justify-center text-gray-600'>

                    <p>Generate, edit and explore design with AI, export code as well</p>
                </div>
                <div className='relative min-w-lg max-w-lg'>
                    <Textarea
                        value={userinput}
                        onChange={(e) => setUserinput(e.target.value)}
                        className="bg-gray-100 h-[15vh] w-full placeholder-blue-400 text-black"
                        placeholder="What are we gonna build today?"
                    />
                    <div className='absolute gap-0.5 bottom-0.5 left-0.5'>
                        <Button className='' variant='ghost'>
                            <Image className='' src='/add.svg' alt='add' width={18} height={18} />
                        </Button>

                        <Button className='p-1 ' variant='ghost'>
                            <Image className='' src='/img.svg' alt='add' width={18} height={18} />
                        </Button>
                    </div>
                    {isSignedIn ? (
                        <Link href="/workspace">
                            <Button disabled={!userinput} variant='ghost' className='right-0.5 bottom-0.5 absolute'>
                                Start <Image className='' src='/arrowup.svg' alt='add' width={18} height={18} />
                            </Button>
                        </Link>
                    ) : (
                        <SignInButton mode='modal'>
                            <Button disabled={!userinput} variant='ghost' className='right-0.5 bottom-0.5 absolute'>
                                Start <Image className='' src='/arrowup.svg' alt='add' width={18} height={18} />
                            </Button>
                        </SignInButton>
                    )}
                </div>

                <div className='gap-1 flex justify-center mt-2'>
                    {suggestion.map((item, index) => (

                        <Button onClick={() => { setUserinput(item.prompt) }} key={index} variant='outline'>{item.label}</Button>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Hero
