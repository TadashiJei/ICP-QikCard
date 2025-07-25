'use client';

import { useRouter } from 'next/navigation';
import { PlusIcon, DevicePhoneMobileIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      name: 'Create Event',
      description: 'Start a new event with QikPoint integration',
      icon: PlusIcon,
      action: () => router.push('/events/new'),
      color: 'text-blue-600',
    },
    {
      name: 'Register Device',
      description: 'Add new QikPoint device to your inventory',
      icon: DevicePhoneMobileIcon,
      action: () => router.push('/devices/new'),
      color: 'text-green-600',
    },
    {
      name: 'View Analytics',
      description: 'Check real-time event performance',
      icon: ChartBarIcon,
      action: () => router.push('/analytics'),
      color: 'text-purple-600',
    },
    {
      name: 'Manage Participants',
      description: 'Review and approve registrations',
      icon: UsersIcon,
      action: () => router.push('/participants'),
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={action.action}
              className="group flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <action.icon className={`w-8 h-8 mb-2 ${action.color} group-hover:scale-110 transition-transform`} />
              <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
