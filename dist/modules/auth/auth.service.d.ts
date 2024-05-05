import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRtnDto } from './dtos/UserRtnDto.dto';
import { User } from 'src/entities';
import { UserFirebase } from './dtos/UserFirebase.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly em;
    private readonly userService;
    private readonly mailerService;
    private readonly userRepository;
    private readonly logger;
    constructor(jwtService: JwtService, em: EntityManager, userService: UsersService, mailerService: MailerService, userRepository: EntityRepository<User>, logger: Logger);
    sendMail(email: string, code: string, name: string, template: string, subject: string): Promise<void>;
    googleLogin(firebaseUser: UserFirebase): Promise<string>;
    generateToken: (user: UserRtnDto) => Promise<string>;
}
