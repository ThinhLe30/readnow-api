import { Logger } from '@nestjs/common';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService, logger: Logger);
    getCurrentUserInfo(res: any, req: any): Promise<any>;
}
