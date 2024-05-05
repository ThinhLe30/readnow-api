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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const core_1 = require("@mikro-orm/core");
const mysql_1 = require("@mikro-orm/mysql");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
const nest_winston_1 = require("nest-winston");
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    constructor(em, userRepository, logger) {
        this.em = em;
        this.userRepository = userRepository;
        this.logger = logger;
    }
    async duplicatedEmail(email) {
        try {
            const count = await this.em.count('User', { email: email });
            if (count < 1)
                return false;
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findOne({ email: email });
            if (!user)
                return null;
            return user;
        }
        catch (error) {
            this.logger.error('Calling getUserByEmail()', error, UsersService_1.name);
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.findOne({ id: id });
            if (!user)
                throw new common_1.NotFoundException(`Can not find user with id: ${id}`);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserByGoogleId(id) {
        try {
            const user = await this.userRepository.findOne({ authId: id });
            if (!user)
                return null;
            return user;
        }
        catch (error) {
            this.logger.error('Calling getUserByGoogleId()', error, UsersService_1.name);
            throw error;
        }
    }
};
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.User)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [mysql_1.EntityManager,
        core_1.EntityRepository,
        common_1.Logger])
], UsersService);
//# sourceMappingURL=users.service.js.map