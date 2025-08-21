export declare class CreateUserDto {
    principalId: string;
    email?: string | null;
    displayName: string;
    avatar?: string | null;
    role?: 'USER' | 'ORGANIZER' | 'ADMIN';
    isActive?: boolean;
}
