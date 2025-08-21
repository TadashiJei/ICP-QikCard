export declare class UpdateNotificationDto {
    title?: string;
    message?: string;
    type?: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
    isRead?: boolean;
    metadata?: string;
}
