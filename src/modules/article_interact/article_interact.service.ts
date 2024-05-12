import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { User } from "src/entities";
import { Article } from "src/entities/article.entity";
import { CheckList } from "src/entities/checklist.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ArticleInteractService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async voteArticle(articleID: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleID,
      });
      if (!article) {
        throw new NotFoundException("Article not found");
      }
      article.voteCount += 1;
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error(
        "Calling likeArticle()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }
  async unVoteArticle(articleID: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleID,
      });
      if (!article) {
        throw new NotFoundException("Article not found");
      }
      if (article.voteCount > 0) {
        article.voteCount -= 1;
        await this.em.persistAndFlush(article);
      }
    } catch (error) {
      this.logger.error(
        "Calling likeArticle()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }

  async viewArticle(articleID: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleID,
      });
      if (!article) {
        throw new NotFoundException("Article not found");
      }
      article.viewCount += 1;
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error(
        "Calling viewArticle()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }

  async addChecklist(loginId: string, articleId: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleId,
      });
      if (!article) {
        throw new NotFoundException("Article not found");
      }
      const user = await this.em.findOne(User, { id: loginId });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const checkList = new CheckList();
      checkList.id = uuidv4();
      checkList.article = article;
      checkList.user = user;
      checkList.created_at = new Date();
      checkList.updated_at = new Date();
      checkList.deleted_at = null;
      await this.em.persistAndFlush(checkList);
    } catch (error) {
      this.logger.error(
        "Calling addChecklist()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }

  async removeChecklist(loginId: string, articleId: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleId,
      });
      if (!article) {
        throw new NotFoundException("Article not found");
      }
      const queryObj = {
        $and: [
          {
            article: {
              $and: [{ id: articleId }],
            },
          },
          {
            user: {
              $and: [{ id: loginId }],
            },
          },
        ],
      };
      const checklistDb = await this.em.findOne(CheckList, queryObj);
      if (!checklistDb) {
        throw new NotFoundException("Checklist not found");
      }
      await this.em.removeAndFlush(checklistDb);
    } catch (error) {
      this.logger.error(
        "Calling removeChecklist()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }
}
