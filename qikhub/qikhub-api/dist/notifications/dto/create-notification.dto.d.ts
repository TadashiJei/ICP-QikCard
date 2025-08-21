export declare class CreateNotificationDto {
    title: string;
    message: string;
    type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
    userId: string;
    isRead?: boolean;
    metadata?: string;
}
