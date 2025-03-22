'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Heart, Pill } from 'lucide-react';
import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Sample health tips
const healthTips = [
  "Take a 10-minute walk after each meal to improve digestion and blood sugar control.",
  "Stay hydrated by drinking at least 8 glasses of water daily, even if you don't feel thirsty.",
  "Practice deep breathing for 5 minutes daily to reduce stress and improve lung function.",
  "Eat colorful fruits and vegetables to ensure you get a variety of nutrients.",
  "Maintain social connections - call a friend or family member today."
];

// Sample upcoming reminders
const upcomingReminders = [
  { time: "8:00 AM", title: "Blood pressure medication", type: "medication" },
  { time: "9:30 AM", title: "Doctor's appointment", type: "appointment" },
  { time: "12:00 PM", title: "Lunch + diabetes medication", type: "medication" },
  { time: "3:00 PM", title: "Walk for 15 minutes", type: "activity" },
];

export default function Home() {
  const [currentTip, setCurrentTip] = useState("");
  
  useEffect(() => {
    // Get a random health tip
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setCurrentTip(randomTip);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-6 w-6 text-primary" /> 
              Health Tip of the Day
            </CardTitle>
            <CardDescription>
              Daily advice to improve your wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{currentTip}</p>
            <Button className="mt-4" variant="outline">
              Get Another Tip
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Today's Reminders
              </CardTitle>
              <CardDescription>
                Your upcoming reminders for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    {reminder.type === "medication" ? (
                      <Pill className="h-5 w-5 text-primary" />
                    ) : (
                      <Calendar className="h-5 w-5 text-primary" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Complete
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                View All Reminders
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Health Summary
              </CardTitle>
              <CardDescription>
                Your recent health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="text-lg font-medium">120/80 mmHg</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    <span className="text-xs font-medium">Normal</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Sugar</p>
                    <p className="text-lg font-medium">110 mg/dL</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    <span className="text-xs font-medium">Normal</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="text-lg font-medium">72 BPM</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    <span className="text-xs font-medium">Normal</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}