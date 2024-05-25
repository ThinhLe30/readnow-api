import { Module } from "@nestjs/common";
import { ArticleInteractController } from "./article_interact.controller";
import { ArticleInteractService } from "./article_interact.service";
import { UsersService } from "../users/users.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/entities";
import { Article } from "src/entities/article.entity";
import { CheckList } from "src/entities/checklist.entity";
import { Vote } from "src/entities/vote.entity";

@Module({
  controllers: [ArticleInteractController],
  providers: [ArticleInteractService, UsersService],
  imports: [MikroOrmModule.forFeature([User, Article, CheckList, Vote])],
})
export class ArticleInteractModule {}
