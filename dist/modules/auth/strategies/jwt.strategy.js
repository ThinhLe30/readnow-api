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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const nest_winston_1 = require("nest-winston");
let JwtStrategy = exports.JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(logger, userService) {
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.logger = logger;
        this.userService = userService;
    }
    async validate(payload) {
        try {
            const { email } = payload;
            const userDb = await this.userService.getUserByEmail(email);
            if (!userDb)
                throw new common_1.UnauthorizedException('Account not found!');
            return userDb;
        }
        catch (error) {
            this.logger.error('Calling validate()', error, JwtStrategy_1.name);
            throw error;
        }
    }
};
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [common_1.Logger,
        users_service_1.UsersService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map