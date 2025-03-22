'use client';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { 
  Home, 
  Bell, 
  Settings, 
  History, 
  FileText, 
  User, 
  Heart, 
  LogOut, 
  HelpCircle, 
  Calendar, 
  MessageSquare, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
}

const MenuItem = ({ href, icon, label, badge }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        tooltip={label}
        className="py-3 px-4 text-base hover:bg-slate-50 rounded-xl transition-all duration-200"
      >
        <a href={href} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {icon}
            <span>{label}</span>
          </div>
          {badge || <ChevronRight className="h-4 w-4 text-slate-400" />}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const UserProfile = ({ greeting }: { greeting: string }) => {
  const {user} = useUser();
  return (
  <div className="px-4 py-4 bg-slate-50">
    <div className="flex items-center gap-3">
      <UserButton/>
      <div className="flex flex-col">
        <span className="text-base font-semibold">{user?.fullName}</span>
        <span className="text-sm text-muted-foreground">{greeting}!</span>
      </div>
    </div>
  </div>
);
};

const SupportCard = () => (
  <div className="mx-4 my-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-blue-800">Need assistance?</span>
      <p className="text-xs text-blue-600">We're here to help with your eldercare needs</p>
      <Button className="mt-2 w-full bg-white text-blue-600 hover:bg-blue-50 border border-blue-200">
        Contact Support
      </Button>
    </div>
  </div>
);

export function DashboardSidebar() {
  const [greeting, setGreeting] = useState("Good day");
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [pendingTasks, setPendingTasks] = useState(2);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const dashboardItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { 
      href: "/reminders", 
      icon: <Bell className="h-5 w-5" />, 
      label: "Reminders",
      badge: unreadNotifications > 0 && <Badge variant="destructive" className="rounded-full">{unreadNotifications}</Badge>
    },
    // { 
    //   href: "/tasks", 
    //   icon: <Activity className="h-5 w-5" />, 
    //   label: "Tasks",
    //   badge: pendingTasks > 0 && <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">{pendingTasks}</Badge>
    // },
    { href: "/history", icon: <History className="h-5 w-5" />, label: "History" },
    { href: "/diagnosis", icon: <FileText className="h-5 w-5" />, label: "Diagnosis" },
    // { href: "/messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
  ];

  const accountItems = [
    { href: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <Sidebar variant="inset" collapsible="none" className="border-r shadow-sm">
      <SidebarHeader className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#a071f9] to-[#573c9d] p-2 rounded-xl">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-br from-[#a071f9] via-[#9267F8] to-[#573c9d] bg-clip-text text-transparent">ElderCare AI</span>
        </div>
      </SidebarHeader>
      
      <UserProfile greeting={greeting} />
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-slate-500 px-3 py-2">DASHBOARD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <MenuItem key={item.href} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="my-3 border-t border-slate-200"></div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-slate-500 px-3 py-2">ACCOUNT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <MenuItem key={item.href} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="mt-auto"></div>
      
      <SupportCard />
      

    </Sidebar>
  );
}