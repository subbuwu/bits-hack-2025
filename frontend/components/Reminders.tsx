'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Pill, Trash2, Plus } from 'lucide-react';
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import {toast,Toaster} from "sonner"


// Define the Reminder type properly
export interface Reminder {
  id: string;
  clerk_id: string;
  medication_title: string;
  created_at: string;
}

interface RemindersScreenProps {
  initialData: Reminder[];
  initialLoading?: boolean;
}

export default function RemindersScreen({ initialData, initialLoading = false }: RemindersScreenProps) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [medTitle, setMedTitle] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update reminders when initialData changes
  useEffect(() => {
    if (initialData) {
      setReminders(initialData);
    }
  }, [initialData]);

  const fetchReminders = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('clerk_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setReminders(data as Reminder[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reminders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReminder = async () => {
    if (!user?.id || !medTitle.trim()) {
      toast.error("Please enter a valid reminder title")
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('reminders')
        .insert({ 
          clerk_id: user.id,
          medication_title: medTitle.trim() 
        });
        
      if (error) {
        throw error;
      }
      
      // Reset form and close dialog
      setMedTitle("");
      setOpen(false);
      toast.success("Reminder added successfully")
      
      // Fetch updated reminders
      fetchReminders();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add reminder")
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setReminders(current => current.filter(reminder => reminder.id !== id));
      toast.success("Reminder deleted successfully")
    } catch (err) {
      toast.error("Failed to delete reminder")
    }
  };

  const handleCompleteReminder = async (id: string) => {
    toast.success("Reminder marked as complete")
    // Implement completion logic here if needed
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <Toaster richColors position="top-center"/>
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
                <Input 
                  id="title" 
                  placeholder="Take medication" 
                  value={medTitle} 
                  onChange={(e) => setMedTitle(e.target.value)} 
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                size="lg" 
                className="bg-sky-500 hover:bg-sky-600" 
                onClick={handleSaveReminder}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : "Save Reminder"}
              </Button>
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
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
                <p className="text-sky-600">Loading your reminders...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-8 text-red-500">
                <p className="text-lg font-medium">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => fetchReminders()}
                >
                  Try Again
                </Button>
              </div>
            ) : reminders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-sky-600">
                <div className="rounded-full bg-sky-100 p-4 mb-4">
                  <Bell className="h-12 w-12 text-sky-500" />
                </div>
                <p className="text-lg font-medium text-sky-700 mb-2">No reminders found</p>
                <p className="text-center max-w-md mb-6">Add your first reminder to keep track of your medications.</p>
                <Button 
                  onClick={() => setOpen(true)}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Reminder
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reminders.map((reminder, index) => (
                  <motion.div 
                    key={reminder.id || index}
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
                      <p className="text-sm text-sky-600">
                        {reminder.created_at ? new Date(reminder.created_at).toLocaleString() : 'Date unavailable'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-sky-200 text-sky-600 hover:bg-sky-50"
                        onClick={() => handleCompleteReminder(reminder.id)}
                      >
                        Complete
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-400 hover:bg-red-50"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
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