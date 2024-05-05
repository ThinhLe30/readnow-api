import { Role } from 'src/common/enum/common.enum';
export declare class RegisterDto {
    email: string | undefined;
    password?: string;
    firstName: string;
    lastName?: string;
    photo?: string;
    phoneNumber: string;
    role: Role;
    verificationCode?: string;
}
