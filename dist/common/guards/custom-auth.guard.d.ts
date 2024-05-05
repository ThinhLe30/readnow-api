import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
declare const CustomAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CustomAuthGuard extends CustomAuthGuard_base {
    readonly jwtService: JwtService;
    readonly userService: UsersService;
    constructor(jwtService: JwtService, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
