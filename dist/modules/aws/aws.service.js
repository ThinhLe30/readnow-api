"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AWSService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let AWSService = exports.AWSService = AWSService_1 = class AWSService {
    constructor(logger, configService) {
        this.logger = logger;
        this.configService = configService;
        try {
            const clientParams = {
                region: process.env.AWS_BUCKET_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY,
                },
            };
            this.s3Client = new client_s3_1.S3Client(clientParams);
        }
        catch (err) {
            this.logger.error('Calling constructor()', err, AWSService_1.name);
            throw err;
        }
    }
    getObjectUrl(folderPath, fileName) {
        return `${this.configService.get('AWS_BUCKET_URL')}/${folderPath}/${fileName}`;
    }
    extractObjectNameFromUrl(objectUrl) {
        try {
            const url = new URL(objectUrl);
            return url.pathname.replace('/', '');
        }
        catch (err) {
            this.logger.error('Calling extractObjectNameFromUrl()', err, AWSService_1.name);
            return 'https://www.facebook.com/';
        }
    }
    async bulkDeleteObject(filePath) {
        try {
            const param = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: this.extractObjectNameFromUrl(filePath),
            };
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand(param));
        }
        catch (err) {
            this.logger.error('Calling deleteObject()', err, AWSService_1.name);
            throw err;
        }
    }
    async bulkPutObject(file, folderPath) {
        try {
            const date = new Date();
            file.originalname = date.getTime() + file.originalname.replace(/ /g, '');
            const fileName = `${folderPath}/${file.originalname}`;
            const cmd = new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                ContentType: file.mimetype,
                Body: file.buffer,
            });
            await this.s3Client.send(cmd);
            return this.getObjectUrl(folderPath, file.originalname);
        }
        catch (err) {
            this.logger.error('Calling bulkPutObject()', err, AWSService_1.name);
            throw err;
        }
    }
    async bulkPutObjects(folderPath, files) {
        try {
            if (!Array.isArray(files)) {
                files = [].concat(files);
            }
            const commands = files.map((file) => {
                const date = new Date();
                file.originalname =
                    date.getTime() + file.originalname.replace(/ /g, '');
                return new client_s3_1.PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `${folderPath}/${file.originalname}`,
                    ContentType: file.mimetype,
                    Body: file.buffer,
                });
            });
            await Promise.all(commands.map((cmd) => this.s3Client.send(cmd)));
            return files.map((file) => this.getObjectUrl(folderPath, file.originalname));
        }
        catch (err) {
            this.logger.error('Calling bulkPutObject()', err, AWSService_1.name);
            throw err;
        }
    }
    async bulkDeleteObjects(filePaths) {
        try {
            if (filePaths.length > 0) {
                const params = {
                    Bucket: this.configService.get('AWS_BUCKET_NAME'),
                    Delete: {
                        Objects: filePaths.map((path) => ({
                            Key: this.extractObjectNameFromUrl(path),
                        })),
                    },
                };
                await this.s3Client.send(new client_s3_1.DeleteObjectsCommand(params));
            }
        }
        catch (err) {
            this.logger.error('Calling deleteObject()', err, AWSService_1.name);
            throw err;
        }
    }
};
exports.AWSService = AWSService = AWSService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [winston_1.Logger,
        config_1.ConfigService])
], AWSService);
//# sourceMappingURL=aws.service.js.map