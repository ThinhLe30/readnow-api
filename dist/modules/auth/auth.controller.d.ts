import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dtos/LoginDto.dto';
import { OAuth2Client } from './google_client/google-client.config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    private readonly logger;
    private readonly oauth2Client;
    constructor(authService: AuthService, userService: UsersService, jwtService: JwtService, logger: Logger, oauth2Client: OAuth2Client);
    login(res: Response, req: any, loginDto: LoginDto): Promise<void>;
}
