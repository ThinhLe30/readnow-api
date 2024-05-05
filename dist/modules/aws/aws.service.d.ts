/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
export declare class AWSService {
    private readonly logger;
    private readonly configService;
    private readonly s3Client;
    constructor(logger: Logger, configService: ConfigService);
    getObjectUrl(folderPath: string, fileName: string): string;
    extractObjectNameFromUrl(objectUrl: string): string;
    bulkDeleteObject(filePath: string): Promise<void>;
    bulkPutObject(file: Express.Multer.File, folderPath: string): Promise<string>;
    bulkPutObjects(folderPath: string, files: Array<Express.Multer.File> | Express.Multer.File): Promise<string[]>;
    bulkDeleteObjects(filePaths: Array<string>): Promise<void>;
}
