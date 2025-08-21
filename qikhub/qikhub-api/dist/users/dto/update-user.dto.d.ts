export declare class UpdateUserDto {
    principalId?: string;
    email?: string | null;
    displayName?: string;
    avatar?: string | null;
    role?: 'USER' | 'ORGANIZER' | 'ADMIN';
    isActive?: boolean;
}
