import { ConfigService } from '@nestjs/config';
import { Auth } from 'googleapis';
export declare class OAuth2Client {
    private readonly configService;
    oauth2Client: Auth.OAuth2Client;
    constructor(configService: ConfigService);
    getInfo(accessToken: string): Promise<import("googleapis").oauth2_v2.Schema$Userinfo>;
}
