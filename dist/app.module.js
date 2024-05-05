"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_1 = require("@mikro-orm/nestjs");
const nest_morgan_1 = require("nest-morgan");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const configs_1 = require("./configs");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const mailer_1 = require("@nest-modules/mailer");
const path_1 = require("path");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("./modules/users/users.module");
const aws_module_1 = require("./modules/aws/aws.module");
const preauth_middleware_1 = require("./modules/auth/preauth.middleware");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(preauth_middleware_1.PreauthMiddleware).forRoutes({
            path: 'auth/login/google',
            method: common_1.RequestMethod.POST,
        });
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_morgan_1.MorganModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
            nestjs_1.MikroOrmModule.forRootAsync({
                useFactory: () => (0, configs_1.MikroOrmConfig)(),
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                useFactory: () => (0, configs_1.NestWinsternConfig)(),
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    transport: {
                        host: process.env.MAIL_HOST,
                        secure: false,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASS,
                        },
                    },
                    defaults: {
                        from: `"No Reply " <${process.env.MAIL_FROM}>`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'src/templates/email'),
                        adapter: new mailer_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            aws_module_1.AWSModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: (0, nest_morgan_1.MorganInterceptor)('combined'),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map