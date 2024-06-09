import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MorganModule, MorganInterceptor } from "nest-morgan";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { MikroOrmConfig, NestWinsternConfig } from "./configs";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./modules/users/users.module";
import { AWSModule } from "./modules/aws/aws.module";
import { PreauthMiddleware } from "./modules/auth/preauth.middleware";
import { ArticleModule } from "./modules/article/article.module";
import { CategoryModule } from "./modules/category/category.module";
import { ArticleInteractModule } from "./modules/article_interact/article_interact.module";
import { SearchModule } from "./modules/search/search.module";
import { ChecklistModule } from "./modules/checklist/checklist.module";

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env"] }),
    MikroOrmModule.forRootAsync({
      useFactory: () => MikroOrmConfig(),
    }),
    WinstonModule.forRootAsync({
      useFactory: () => NestWinsternConfig(),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    AuthModule,
    UsersModule,
    AWSModule,
    ArticleModule,
    CategoryModule,
    ArticleInteractModule,
    SearchModule,
    ChecklistModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: "auth/login/google",
      method: RequestMethod.POST,
    });
  }
}
