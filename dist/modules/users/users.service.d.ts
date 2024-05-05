import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Logger } from '@nestjs/common';
import { User } from 'src/entities';
export declare class UsersService {
    private readonly em;
    private readonly userRepository;
    private readonly logger;
    constructor(em: EntityManager, userRepository: EntityRepository<User>, logger: Logger);
    duplicatedEmail(email: string): Promise<boolean>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    getUserByGoogleId(id: string): Promise<User>;
}
