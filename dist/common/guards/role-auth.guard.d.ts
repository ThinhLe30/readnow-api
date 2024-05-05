import { UsersService } from '../../modules/users/users.service';
import { ExecutionContext } from '@nestjs/common';
export declare const RoleAuthGuard: (acceptedRoles: Array<string>) => import("@nestjs/common").Type<{
    readonly userService: UsersService;
    canActivate(context: ExecutionContext): Promise<boolean>;
}>;
