'use client';

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { 
  SidebarProvider, 
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import {  Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Mobile Menu Button and Navbar */}
        <div className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between ${
          isMobileMenuOpen ? 'hidden' : 'block'
        }`}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-purple-700 hover:text-white bg-purple-500 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Sidebar with mobile responsiveness */}
        <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 ' : '-translate-x-full'
        }`}>
          <DashboardSidebar onClose={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <SidebarInset>
          <main className="flex-1 w-full p-6 md:mt-0 mt-10">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}