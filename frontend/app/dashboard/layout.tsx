'use client';

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { BellRing, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1">
            <SignedIn>
            <div className='flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1 shadow-sm'>
              {/* Notifications */}
              <button className='relative p-2 text-neutral-600 hover:text-[#9267F8] hover:bg-white rounded-full transition-colors duration-200'>
                <BellRing size={20} />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              </button>
              
              {/* Messages */}
              <button className='p-2 text-neutral-600 hover:text-[#9267F8] hover:bg-white rounded-full transition-colors duration-200'>
                <MessageCircle size={20} />
              </button>
              
              {/* Favorites */}
              <button className='p-2 text-neutral-600 hover:text-[#9267F8] hover:bg-white rounded-full transition-colors duration-200'>
                <Heart size={20} />
              </button>
              
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
            <div className='flex items-center space-x-3 bg-white/90 rounded-full px-3 py-1 shadow-sm'>
              <SignInButton signUpForceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}>  
                <button className="px-6 py-2 cursor-pointer rounded-full font-medium bg-gradient-to-r from-[#a071f9] to-[#573c9d] text-white hover:shadow-lg transition duration-200">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}