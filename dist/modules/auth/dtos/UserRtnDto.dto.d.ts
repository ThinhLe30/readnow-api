import { Role } from 'src/common/enum/common.enum';
export declare class UserRtnDto {
    googleId?: string;
    email: string | undefined;
    name: string;
    photo?: string;
    role: Role;
    id: string;
    created_at: Date;
    updated_at: Date;
}
