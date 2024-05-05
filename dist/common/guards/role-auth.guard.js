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
exports.RoleAuthGuard = void 0;
const users_service_1 = require("../../modules/users/users.service");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const RoleAuthGuard = (acceptedRoles) => {
    let RoleAuthGuardMixin = class RoleAuthGuardMixin {
        constructor(userService) {
            this.userService = userService;
        }
        async canActivate(context) {
            const req = context.switchToHttp().getRequest();
            const user = req.user;
            if (!acceptedRoles.includes(user.role)) {
                throw new common_1.HttpException('You are not allow to access to this route', common_1.HttpStatus.FORBIDDEN);
            }
            return true;
        }
    };
    RoleAuthGuardMixin = __decorate([
        __param(0, (0, common_2.Inject)(users_service_1.UsersService)),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], RoleAuthGuardMixin);
    return (0, common_2.mixin)(RoleAuthGuardMixin);
};
exports.RoleAuthGuard = RoleAuthGuard;
//# sourceMappingURL=role-auth.guard.js.map