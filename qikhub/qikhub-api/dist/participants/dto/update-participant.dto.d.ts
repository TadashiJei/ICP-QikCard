export declare class UpdateParticipantDto {
    name?: string;
    email?: string;
    phone?: string | null;
    avatar?: string | null;
    customData?: Record<string, unknown> | null;
    status?: 'REGISTERED' | 'APPROVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
    checkedInAt?: Date | null;
    checkedOutAt?: Date | null;
    eventId?: string;
}
