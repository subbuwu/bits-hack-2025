'use client'
import { UserButton,SignedIn,SignInButton,SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'


type Props = {}

const Navbar = (props: Props) => {
    
  return (
    <header className='sticky top-0 z-[50] w-full border-b p-4 border-neutral-200 bg-white'>
        <div className='flex items-center justify-between md:max-w-7xl mx-auto'>
            <div className='text-3xl font-medium '>
                <span className='bg-gradient-to-br from-[#a071f9] via-[#9267F8] to-[#573c9d] bg-clip-text text-transparent'>ElderCare AI</span>   
            </div>
            <div>
            <SignedOut>
        <SignInButton>  
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
      <UserButton/>

      </SignedIn> 
            </div>
        </div>
    </header>
  )
}

export default Navbar

