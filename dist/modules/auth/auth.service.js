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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nest-modules/mailer");
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const users_service_1 = require("../users/users.service");
const UserRtnDto_dto_1 = require("./dtos/UserRtnDto.dto");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../entities");
const nest_winston_1 = require("nest-winston");
const crypto_1 = require("crypto");
const common_enum_1 = require("../../common/enum/common.enum");
let AuthService = exports.AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, em, userService, mailerService, userRepository, logger) {
        this.jwtService = jwtService;
        this.em = em;
        this.userService = userService;
        this.mailerService = mailerService;
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateToken = async (user) => {
            try {
                const accessToken = await this.jwtService.signAsync({
                    ...user,
                });
                return accessToken;
            }
            catch (error) {
                this.logger.error('Calling generateToken()', error, AuthService_1.name);
                throw error;
            }
        };
    }
    async sendMail(email, code, name, template, subject) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: subject,
                template: template,
                context: {
                    name: name,
                    code: code,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async googleLogin(firebaseUser) {
        try {
            const userDb = await this.userService.getUserByGoogleId(firebaseUser.userId);
            let userRtn;
            if (userDb == null) {
                const user = new entities_1.User();
                user.id = (0, crypto_1.randomUUID)();
                user.authId = firebaseUser.userId;
                user.email = firebaseUser.email;
                user.name = firebaseUser.name;
                user.role = common_enum_1.Role.USER;
                user.photo = firebaseUser.picture;
                this.userRepository.persist(user).flush();
                userRtn = (0, class_transformer_1.plainToInstance)(UserRtnDto_dto_1.UserRtnDto, user);
            }
            else {
                userRtn = (0, class_transformer_1.plainToInstance)(UserRtnDto_dto_1.UserRtnDto, userDb);
            }
            const accessToken = this.generateToken(userRtn);
            return accessToken;
        }
        catch (error) {
            this.logger.error('Calling googleLogin()', error, AuthService_1.name);
            throw error;
        }
    }
};
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, nestjs_1.InjectRepository)(entities_1.User)),
    __param(5, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mysql_1.EntityManager,
        users_service_1.UsersService,
        mailer_1.MailerService,
        mysql_1.EntityRepository,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map