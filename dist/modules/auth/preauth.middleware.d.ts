import { NestMiddleware } from '@nestjs/common';
import 'dotenv/config';
export declare class PreauthMiddleware implements NestMiddleware {
    private defaultApp;
    constructor();
    use(req: any, res: any, next: (error?: any) => void): void;
    private accessDenied;
}
