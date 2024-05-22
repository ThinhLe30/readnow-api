import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Article } from "src/entities/article.entity";
import { Category } from "src/entities/category.entity";
import { SearchService } from "./search.service";
import { ArticleService } from "../article/article.service";
import { AWSService } from "../aws/aws.service";
import { ArticleModule } from "../article/article.module";

@Module({
  controllers: [SearchController],
  imports: [MikroOrmModule.forFeature([Article]), ArticleModule],
  providers: [SearchService],
})
export class SearchModule {}
