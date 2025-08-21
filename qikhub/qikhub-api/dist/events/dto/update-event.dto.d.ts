export declare class UpdateEventDto {
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    maxAttendees?: number;
    status?: 'DRAFT' | 'ACTIVE' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
    venueName?: string;
    venueAddress?: string;
    venueLat?: number | null;
    venueLng?: number | null;
    wifiAvailable?: boolean;
    registrationOpen?: boolean;
    requireApproval?: boolean;
    customFields?: Record<string, unknown> | null;
    organizerId?: string;
}
