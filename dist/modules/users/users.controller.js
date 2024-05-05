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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const nest_winston_1 = require("nest-winston");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const common_enum_1 = require("../../common/enum/common.enum");
const UserRtnDto_dto_1 = require("../auth/dtos/UserRtnDto.dto");
const class_transformer_1 = require("class-transformer");
let UsersController = exports.UsersController = UsersController_1 = class UsersController {
    constructor(usersService, logger) {
        this.usersService = usersService;
        this.logger = logger;
    }
    async getCurrentUserInfo(res, req) {
        try {
            const user = await this.usersService.getUserByEmail(req.user.email);
            return res.status(200).json({
                message: 'Get current user info successfully',
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                data: (0, class_transformer_1.plainToInstance)(UserRtnDto_dto_1.UserRtnDto, user),
            });
        }
        catch (error) {
            this.logger.error('Calling getCurrentUserInfo()', error, UsersController_1.name);
            throw error;
        }
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: UserRtnDto_dto_1.UserRtnDto,
    }),
    (0, common_1.Get)('/me'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUserInfo", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        common_1.Logger])
], UsersController);
//# sourceMappingURL=users.controller.js.map