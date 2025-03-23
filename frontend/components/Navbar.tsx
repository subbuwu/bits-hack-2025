'use client'
import { UserButton, SignedIn, SignInButton, SignedOut, SignUpButton, SignUp } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import {  LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <header 
      className={`sticky top-0 z-[50] w-full backdrop-blur-md bg-white/80 transition-all duration-300 border-b border-gray-200 pb-1 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className='flex items-center justify-between px-4 py-3 md:py-2 md:px-8 md:max-w-7xl mx-auto'>
        {/* Logo */}
        <Link href="/" className='flex items-center space-x-2'>
          <div className='text-3xl font-bold'>
            <span className='bg-gradient-to-br from-[#a071f9] via-[#9267F8] to-[#573c9d] bg-clip-text text-transparent drop-shadow-sm'>ElderCare AI</span>
          </div>
        </Link>


        {/* User Actions */}
        <div className='hidden md:flex items-center space-x-2'>
          <SignedIn>
            <div className='flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1 shadow-sm'>
              {/* Notifications */}
              <Link href="/dashboard">
              <button className='relative cursor-pointer flex items-center justify-center gap-2 p-2 text-neutral-600 hover:text-[#9267F8] hover:bg-white rounded-full transition-colors duration-200'>
                <LayoutDashboard size={20} />
                Go To Dashboard
              </button></Link>
  
              {/* User Profile */}
              <div className='pl-2 border-l border-neutral-200'>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9"
                    }
                  }}
                />
              </div>
            </div>
          </SignedIn>
          
          <SignedOut>
              <SignUpButton>  
                <button className="px-12 py-2 cursor-pointer rounded-full font-bold bg-gradient-to-r from-[#a071f9] to-[#573c9d] text-white hover:shadow-lg hover:scale-105 transition duration-200">
                Sign Up
                </button>
              </SignUpButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 right-0 backdrop-blur-lg bg-white/90 shadow-lg py-4 px-6 z-50 border-b border-neutral-100'>
          <nav className='flex flex-col space-y-2'>
            
            <SignedOut>
              <div className='pt-4 border-t border-neutral-200 mt-2'>
                <SignUpButton >  
                  <button className="w-full py-3 cursor-pointer rounded-xl font-medium bg-gradient-to-r from-[#a071f9] to-[#573c9d] text-white hover:shadow-md transition duration-200">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            
            <SignedIn>
              <div className='pt-4 border-t border-neutral-200 mt-2 flex items-center justify-between'>
                <span className='text-neutral-600 font-medium'>Your Account</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar