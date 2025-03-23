'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Calendar, 
  Heart, 
  Pill, 
  MessageCircle, 
  Phone, 
  ChevronRight,
  LifeBuoy,
  Clock,
  Activity,
  AlertCircle,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { makeAIAssistantCall } from "@/services";

// Sample health tips
const healthTips = [
  {
    tip: "Take a 10-minute walk after each meal to improve digestion and blood sugar control.",
    icon: <Activity className="h-10 w-10 text-blue-500" />,
    category: "Exercise"
  },
  {
    tip: "Stay hydrated by drinking at least 8 glasses of water daily, even if you don't feel thirsty.",
    icon: <AlertCircle className="h-10 w-10 text-blue-500" />,
    category: "Hydration"
  },
  {
    tip: "Practice deep breathing for 5 minutes daily to reduce stress and improve lung function.",
    icon: <LifeBuoy className="h-10 w-10 text-blue-500" />,
    category: "Wellness"
  },
  {
    tip: "Eat colorful fruits and vegetables to ensure you get a variety of nutrients.",
    icon: <Heart className="h-10 w-10 text-blue-500" />,
    category: "Nutrition"
  },
  {
    tip: "Maintain social connections - call a friend or family member today.",
    icon: <ThumbsUp className="h-10 w-10 text-blue-500" />,
    category: "Social Health"
  }
];

// Sample upcoming reminders
const upcomingReminders = [
  { time: "8:00 AM", title: "Blood pressure medication", type: "medication" },
  { time: "9:30 AM", title: "Doctor's appointment", type: "appointment" },
  { time: "12:00 PM", title: "Lunch + diabetes medication", type: "medication" },
  { time: "3:00 PM", title: "Walk for 15 minutes", type: "activity" },
];

export default function DashboardHome() {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [greeting, setGreeting] = useState<string>("Good day");
  const [isCalling,setIsCalling] = useState<boolean>(false);

  const {user} = useUser()
  console.log(user)
  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    // Rotate health tips every 10 seconds
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const currentTip = healthTips[currentTipIndex];
  
  
  const getNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
  };

  const handleAICall = async () => {
    setIsCalling(true);
    try {
      const res = await makeAIAssistantCall(user?.phoneNumbers[0].phoneNumber ?? '');
    console.log(res)
    } catch (error) {
      console.log(error)
    } finally { 
      setIsCalling(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-none bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">
                      {greeting}
                    </h1>
                    <p className="text-xl text-blue-600 mb-6">
                      How can ElderCare AI assist you today?
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full px-12 py-6 cursor-pointer text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md" onClick={handleAICall}> 
                          <Phone className="mr-3 h-6 w-6" />
                          Call AI Assistant
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full px-12 py-6 cursor-pointer text-lg font-medium bg-green-500 hover:bg-green-600 rounded-2xl shadow-md">
                          <MessageCircle className="mr-3 h-6 w-6" />
                          Chat with AI (WhatsApp)
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
  
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Upcoming Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            
          </motion.div>
        </div>
        
        {/* Right Column - Health Tips */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-1"
        >
          <Card className="h-full bg-gradient-to-br from-teal-50 to-blue-50 shadow-sm border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center text-teal-700">
                <Heart className="mr-2 h-5 w-5 text-teal-500" />
                Health Tips
              </CardTitle>
              <CardDescription>
                Daily advice for your wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                key={currentTipIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-teal-100"
              >
                <div className="flex flex-col items-center text-center mb-6">
                  {currentTip.icon}
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    {currentTip.category}
                  </span>
                </div>
                <p className="text-lg text-slate-700 mb-6 text-center">
                  "{currentTip.tip}"
                </p>
                <Button 
                  onClick={getNextTip} 
                  className="w-full flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-xl"
                >
                  Next Tip <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              

            </CardContent>

          </Card>
        </motion.div>
      </div>
    </div>
  );
}