'use client';

import { useRouter } from 'next/navigation';
import { formatDate, getStatusColor } from '@/lib/utils';
import { UsersIcon, CalendarIcon, MapPinIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    venueName: string;
    venueAddress: string;
    maxAttendees: number;
    _count?: {
      participants: number;
      devices: number;
    };
  };
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{event.venueName}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 mr-2" />
              <span>{event._count?.participants || 0} / {event.maxAttendees}</span>
            </div>
            <div className="flex items-center">
              <DevicePhoneMobileIcon className="w-4 h-4 mr-2" />
              <span>{event._count?.devices || 0} devices</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/events/${event.id}`)}
            >
              View Details
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => router.push(`/events/${event.id}/analytics`)}
            >
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
