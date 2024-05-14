import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Article } from "src/entities/article.entity";
import { Category } from "src/entities/category.entity";
import { AWSService } from "../aws/aws.service";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, AWSService],
  imports: [MikroOrmModule.forFeature([Article, Category])],
})
export class ArticleModule {}
