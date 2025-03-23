'use client'
import RemindersScreen from '@/components/Reminders';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export type Reminder = {
  clerk_id: string,
  created_at: string,
  medication_title: string
}

export default function RemindersPage() {
  const { user } = useUser();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReminders = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('reminders')
          .select('*')
          .eq('clerk_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          setError('Failed to fetch reminders');
          console.error('Error fetching reminders:', error);
          return;
        }

        setReminders(data || []);
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <RemindersScreen data={reminders} isLoading={isLoading} error={error} />
  );
}
