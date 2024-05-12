import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Article } from "src/entities/article.entity";
import { ArticleAddDTO } from "./dtos/article.add.dto";
import { Category } from "src/entities/category.entity";
import { v4 as uuidv4 } from "uuid";
import { ArticleUpdateDTO } from "./dtos/article.update.dto";
@Injectable()
export class ArticleService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async getAllArticle(keyword: string): Promise<Article[]> {
    try {
      if (!keyword) keyword = "";
      const likeQr = { $like: `%${keyword}%` };
      const queryObj = {
        $or: [
          { title: likeQr },
          { author: likeQr },
          { description: likeQr },
          { content: likeQr },
          {
            category: {
              name: likeQr,
            },
          },
        ],
      };
      const articles = await this.articleRepository.find(queryObj, {
        populate: ["category"],
      });
      return articles;
    } catch (error) {
      this.logger.error("Calling getAllArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async getArticleById(id: string): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne(
        { id: id },
        { populate: ["category"] }
      );
      if (!article) return null;
      return article;
    } catch (error) {
      this.logger.error("Calling getAllArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async createArticle(dto: ArticleAddDTO) {
    try {
      if (!dto.description) {
        dto.description = dto.content.slice(0, 100);
      }
      if (!dto.publishedAt) {
        dto.publishedAt = new Date();
      }
      const category = await this.em.findOne(Category, dto.categoryID);
      if (!category)
        throw new NotFoundException(
          `Can not find category with id: ${dto.categoryID}`
        );
      let article = plainToInstance(Article, dto);
      article.id = uuidv4();
      article.category = category;
      article.created_at = new Date();
      article.updated_at = new Date();
      article.deleted_at = null;
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error("Calling createArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async updateArticle(dto: ArticleUpdateDTO, id: string) {
    try {
      let article = await this.getArticleById(id);
      if (!article)
        throw new NotFoundException(`Can not find article with id: ${id}`);
      const category = await this.em.findOne(Category, dto.categoryID);
      if (!category)
        throw new NotFoundException(
          `Can not find category with id: ${dto.categoryID}`
        );
      if (!dto.description) {
        article.description = dto.content.slice(0, 100);
      }
      if (!dto.publishedAt) {
        article.publishedAt = new Date();
      }
      article.author = dto.author;
      article.title = dto.title;
      article.content = dto.content;
      article.url = dto.url;
      article.imageURL = dto.imageURL;
      article.category = category;
      article.updated_at = new Date();
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error("Calling createArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async deleteArticle(id: string) {
    try {
      let article = await this.articleRepository.findOne({ id: id });
      if (!article)
        throw new NotFoundException(`Can not find article with id: ${id}`);
      await this.em.removeAndFlush(article);
    } catch (error) {
      this.logger.error("Calling deleteArticle()", error, ArticleService.name);
      throw error;
    }
  }
}
