import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Article } from "src/entities/article.entity";
import { Category } from "src/entities/category.entity";
import { SearchService } from "./search.service";
import { ArticleModule } from "../article/article.module";
import { CategoryService } from "../category/category.service";
import { UsersService } from "../users/users.service";
import { User } from "src/entities";
import { CheckList } from "src/entities/checklist.entity";

@Module({
  controllers: [SearchController],
  imports: [
    MikroOrmModule.forFeature([Article, Category, User, CheckList]),
    ArticleModule,
  ],
  providers: [SearchService, CategoryService, UsersService],
})
export class SearchModule {}
