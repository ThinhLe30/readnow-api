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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Client = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
let OAuth2Client = exports.OAuth2Client = class OAuth2Client {
    constructor(configService) {
        this.configService = configService;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2({
            clientId: this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
            clientSecret: this.configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
            redirectUri: this.configService.get('GOOGLE_AUTH_CALLBACK_URL'),
        });
    }
    async getInfo(accessToken) {
        try {
            this.oauth2Client.setCredentials({
                access_token: accessToken,
                token_type: 'Bearer',
            });
            const { data } = await googleapis_1.google
                .oauth2({
                auth: this.oauth2Client,
                version: 'v2',
            })
                .userinfo.v2.me.get();
            return data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
exports.OAuth2Client = OAuth2Client = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OAuth2Client);
//# sourceMappingURL=google-client.config.js.map