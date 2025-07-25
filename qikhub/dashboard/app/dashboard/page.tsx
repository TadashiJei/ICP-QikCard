'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/useAuth';
import { EventCard } from '@/components/events/EventCard';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { events, loading: eventsLoading, error } = useEvents();
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalDevices: 0,
    totalParticipants: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (events.length > 0) {
      const activeEvents = events.filter(e => e.status === 'ACTIVE' || e.status === 'ONGOING').length;
      const totalDevices = events.reduce((sum, e) => sum + (e.devices?.length || 0), 0);
      const totalParticipants = events.reduce((sum, e) => sum + (e._count?.participants || 0), 0);
      
      setStats({
        totalEvents: events.length,
        activeEvents,
        totalDevices,
        totalParticipants,
      });
    }
  }, [events]);

  if (authLoading || eventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.displayName}</p>
          </div>
          <Button
            onClick={() => router.push('/events/new')}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Create Event
          </Button>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Quick Actions */}
        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {events.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No events yet. Create your first event to get started!</p>
                  </div>
                ) : (
                  events.slice(0, 5).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
