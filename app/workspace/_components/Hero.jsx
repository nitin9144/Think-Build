"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
// import { SignInButton, useUser } from '@clerk/nextjs'
import { SignIn, SignInButton, useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';

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
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const createnewproject = async () => {
        if (!userinput.trim()) {
            return;
        }

        if (!isSignedIn) {
            toast.error('Please sign in to continue');
            return;
        }

        setloading(true);
        const projectId = uuidv4();
        const frameId = String(generaterandomframenumber());
        const chatMessage = [
            {
                role: 'user',
                content: userinput,
            }
        ]
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId, frameId, chatMessage })
            });

            if (!response.ok) {
                throw new Error(`Failed to create project: ${response.status}`);
            }

            toast.success('Project created successfully');
            await router.push(`/playground/${projectId}?frameId=${frameId}`);
        } catch (err) {
            toast.error('Internal Server Error');
            console.error('Error creating project:', err);
        } finally {
            setloading(false);
        }
    }
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
                        <Button onClick={createnewproject} disabled={!userinput || loading} variant='ghost' className='right-0.5 bottom-0.5 absolute'>
                            Start {loading ? <Image className='' animate='spin' src='/loading.svg' alt='loading' width={18} height={18} /> : <Image className='' src='/arrowup.svg' alt='add' width={18} height={18} />}
                        </Button>
                    ) : (
                        <SignInButton mode='modal'>
                            <Button disabled={!userinput || loading} variant='ghost' className='right-0.5 bottom-0.5 absolute'>
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

const generaterandomframenumber = () => {
    const num = Math.floor(Math.random() * 1000);
    return num;
}
