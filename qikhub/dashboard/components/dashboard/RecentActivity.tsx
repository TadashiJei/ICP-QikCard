'use client';

import { ClockIcon, UserIcon, DevicePhoneMobileIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'event' | 'device' | 'participant' | 'checkin';
  message: string;
  timestamp: string;
  user?: string;
}

export function RecentActivity() {
  // Mock data - in real app, this would come from WebSocket or API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'checkin',
      message: 'John Doe checked in at Tech Conference 2024',
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'device',
      message: 'QikPoint Device #1234 went online',
      timestamp: '2024-01-15T09:45:00Z',
    },
    {
      id: '3',
      type: 'participant',
      message: 'Sarah Smith registered for Tech Conference 2024',
      timestamp: '2024-01-15T09:15:00Z',
    },
    {
      id: '4',
      type: 'event',
      message: 'Tech Conference 2024 started',
      timestamp: '2024-01-15T09:00:00Z',
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'checkin':
        return CheckCircleIcon;
      case 'device':
        return DevicePhoneMobileIcon;
      case 'participant':
        return UserIcon;
      case 'event':
        return ClockIcon;
      default:
        return ClockIcon;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'checkin':
        return 'text-green-600 bg-green-100';
      case 'device':
        return 'text-blue-600 bg-blue-100';
      case 'participant':
        return 'text-purple-600 bg-purple-100';
      case 'event':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
}
