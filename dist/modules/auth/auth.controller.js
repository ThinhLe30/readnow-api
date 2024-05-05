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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const LoginDto_dto_1 = require("./dtos/LoginDto.dto");
const nest_winston_1 = require("nest-winston");
const google_client_config_1 = require("./google_client/google-client.config");
const swagger_1 = require("@nestjs/swagger");
const GoogleLogin_dto_1 = require("./swagger_types/GoogleLogin.dto");
const common_enum_1 = require("../../common/enum/common.enum");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthController = exports.AuthController = AuthController_1 = class AuthController {
    constructor(authService, userService, jwtService, logger, oauth2Client) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = logger;
        this.oauth2Client = oauth2Client;
    }
    async login(res, req, loginDto) {
        try {
            const firebaseInfo = req.firebaseUser;
            console.log(firebaseInfo);
            if (new Date(firebaseInfo.exp * 1000) < new Date()) {
                throw new common_1.HttpException('Token expired', common_1.HttpStatus.UNAUTHORIZED);
            }
            const accessToken = await this.authService.googleLogin(firebaseInfo);
            console.log(accessToken);
            res.status(200).json({
                message: 'Login Successfully',
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                token: accessToken,
            });
        }
        catch (error) {
            this.logger.error('Calling login()', error, AuthController_1.name);
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)('login/google'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: GoogleLogin_dto_1.GoogleLoginTypeDTO,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, LoginDto_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        common_1.Logger,
        google_client_config_1.OAuth2Client])
], AuthController);
//# sourceMappingURL=auth.controller.js.map