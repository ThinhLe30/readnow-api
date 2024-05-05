import { Role } from '../common/enum/common.enum';
import { BaseUUID } from './baseUUID.enity';
export declare class User extends BaseUUID {
    authId: string;
    email: string;
    name: string;
    role: Role;
    photo?: string;
}
