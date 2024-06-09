import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { User } from "src/entities";
import { Article } from "src/entities/article.entity";
import { CheckList } from "src/entities/checklist.entity";
import { Vote } from "src/entities/vote.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ArticleInteractService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(CheckList)
    private readonly checklistRepository: EntityRepository<CheckList>,
    @InjectRepository(Vote)
    private readonly voteRepository: EntityRepository<Vote>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

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
      const user = await this.userRepository.findOneOrFail({ id: loginId });

      const checkListDb = await this.checklistRepository.findOne({
        article: { id: articleId },
        user: { id: loginId },
      });
      if (checkListDb) {
        await this.em.removeAndFlush(checkListDb);
      } else {
        const checkList = new CheckList();
        checkList.id = uuidv4();
        checkList.article = article;
        checkList.user = user;
        checkList.created_at = new Date();
        checkList.updated_at = new Date();
        checkList.deleted_at = null;
        await this.em.persistAndFlush(checkList);
      }
    } catch (error) {
      this.logger.error(
        "Calling addChecklist()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }

  async addVote(loginId: string, articleId: string) {
    try {
      const article = await this.articleRepository.findOneOrFail({
        id: articleId,
      });
      const user = await this.userRepository.findOneOrFail({ id: loginId });

      const voteDB = await this.voteRepository.findOne({
        article: { id: articleId },
        user: { id: loginId },
      });
      if (voteDB) {
        await this.em.removeAndFlush(voteDB);
      } else {
        const vote = new Vote();
        vote.id = uuidv4();
        vote.article = article;
        vote.user = user;
        vote.created_at = new Date();
        vote.updated_at = new Date();
        vote.deleted_at = null;
        await this.em.persistAndFlush(vote);
      }
    } catch (error) {
      this.logger.error(
        "Calling addChecklist()",
        error,
        ArticleInteractService.name
      );
      throw error;
    }
  }
}
