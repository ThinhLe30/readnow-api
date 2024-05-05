import { Strategy } from 'passport-jwt';
import { Logger } from '@nestjs/common';
import { UserRtnDto } from '../dtos/UserRtnDto.dto';
import { UsersService } from 'src/modules/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly logger;
    private readonly userService;
    constructor(logger: Logger, userService: UsersService);
    validate(payload: UserRtnDto): Promise<UserRtnDto>;
}
export {};
