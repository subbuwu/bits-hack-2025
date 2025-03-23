'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, Plus, Pill, Trash2 } from 'lucide-react';
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reminder } from "@/app/dashboard/reminders/page";

interface RemindersScreenProps {
  data: Reminder[];
  isLoading: boolean;
  error: string | null;
}

export default function RemindersScreen({ data, isLoading, error }: RemindersScreenProps) {
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>(data);
  
  // Update reminders when data changes
  useEffect(() => {
    setReminders(data);
  }, [data]);
  
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-4xl font-semibold text-blue-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Reminders
        </motion.h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Reminder</DialogTitle>
              <DialogDescription>
                Create a new reminder for your schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Take medication" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" placeholder="Additional details" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="lg" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" onClick={() => setOpen(false)}>Save Reminder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full border border-sky-100 shadow-sm">
          <CardHeader className="bg-sky-50">
            <CardTitle className="flex items-center gap-2 text-2xl text-sky-700">
              <Bell className="h-5 w-5 text-sky-500" />
              Your Reminders
            </CardTitle>
            <CardDescription className="text-sky-600">
              All your scheduled reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-500">
                {error}
              </div>
            ) : reminders.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sky-600">
                No reminders found. Add your first reminder!
              </div>
            ) : (
              <div className="space-y-4">
                {reminders.map((reminder, index) => (
                  <motion.div 
                    key={reminder.created_at}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-4 rounded-lg border border-sky-100 p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                      <Pill className="h-5 w-5 text-sky-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sky-800">{reminder.medication_title}</p>
                      <p className="text-sm text-sky-600">{new Date(reminder.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-sky-200 text-sky-600 hover:bg-sky-50">
                        Complete
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}