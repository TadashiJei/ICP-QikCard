'use client';

import { UsersIcon, CalendarIcon, DevicePhoneMobileIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface StatsOverviewProps {
  stats: {
    totalEvents: number;
    activeEvents: number;
    totalDevices: number;
    totalParticipants: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      name: 'Total Events',
      value: stats.totalEvents,
      icon: CalendarIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Active Events',
      value: stats.activeEvents,
      icon: CalendarIcon,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Total Devices',
      value: stats.totalDevices,
      icon: DevicePhoneMobileIcon,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'increase',
    },
    {
      name: 'Total Participants',
      value: stats.totalParticipants,
      icon: UsersIcon,
      color: 'bg-orange-500',
      change: '+23%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            <span className="text-sm text-gray-600 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
