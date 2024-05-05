import { Role } from 'src/common/enum/common.enum';
export declare class UpdateUserDTO {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    phoneNumber?: string;
    role?: Role;
}
