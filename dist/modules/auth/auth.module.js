"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../entities");
const aws_module_1 = require("../aws/aws.module");
const passport_1 = require("@nestjs/passport");
const google_client_config_1 = require("./google_client/google-client.config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([entities_1.User]), aws_module_1.AWSModule, passport_1.PassportModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, users_service_1.UsersService, jwt_strategy_1.JwtStrategy, google_client_config_1.OAuth2Client],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map