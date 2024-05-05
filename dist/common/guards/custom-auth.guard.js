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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../../modules/users/users.service");
let CustomAuthGuard = exports.CustomAuthGuard = class CustomAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(jwtService, userService) {
        super();
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { authorization: token } = req.headers;
        if (token) {
            const user = this.jwtService.decode(token.replace(/^Bearer\s+/, '').replace(/^bearer\s+/, ''));
            req.user = user;
        }
        return true;
    }
};
exports.CustomAuthGuard = CustomAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(1, (0, common_1.Inject)(users_service_1.UsersService)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], CustomAuthGuard);
//# sourceMappingURL=custom-auth.guard.js.map