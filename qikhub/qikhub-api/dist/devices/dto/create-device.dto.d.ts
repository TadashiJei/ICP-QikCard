export declare class CreateDeviceDto {
    name: string;
    deviceType: 'NFC' | 'QR' | 'HYBRID';
    deviceId: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ERROR';
    locationName: string;
    locationLat?: number | null;
    locationLng?: number | null;
    firmwareVersion: string;
    batteryLevel?: number;
    signalStrength?: number;
    isOnline?: boolean;
    ownerId: string;
    eventId?: string | null;
    configuration?: string;
}
