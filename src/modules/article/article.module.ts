import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Article } from "src/entities/article.entity";
import { Category } from "src/entities/category.entity";
import { AWSService } from "../aws/aws.service";
import { User } from "src/entities";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, AWSService, UsersService],
  imports: [MikroOrmModule.forFeature([Article, Category, User])],
})
export class ArticleModule {}
