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
import { AWSService } from "../aws/aws.service";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class ArticleService {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsService: AWSService,
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
        $and: [{ deleted_at: null }],
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
      if (article.deleted_at) {
        return null;
      }
      return article;
    } catch (error) {
      this.logger.error("Calling getAllArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async createArticle(file: Express.Multer.File, dto: ArticleAddDTO) {
    try {
      if (!dto.description) {
        dto.description = dto.content.slice(0, 100);
      }
      if (!dto.publishedAt) {
        dto.publishedAt = new Date();
      }
      const category = await this.em.findOne(Category, dto.categoryID);
      if (!category) throw new NotFoundException(`Category not found`);
      let article = plainToInstance(Article, dto);
      article.id = uuidv4();
      // call api to AI server and set summary to article.summary
      const summary = await this.getSummaryFromAI(dto.content);
      article.summary = summary;

      if (file) {
        const photo: string = await this.awsService.bulkPutObject(
          file,
          `article/${article.id}`
        );
        article.imageURL = photo;
      }
      article.id = uuidv4();
      article.category = category;
      article.created_at = new Date();
      article.viewCount = 0;
      article.updated_at = new Date();
      article.deleted_at = null;
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error("Calling createArticle()", error, ArticleService.name);
      throw error;
    }
  }

  async updateArticle(
    file: Express.Multer.File,
    dto: ArticleUpdateDTO,
    id: string
  ) {
    try {
      let article = await this.getArticleById(id);
      if (!article) throw new NotFoundException(`Article not found`);
      if (article.deleted_at) {
        throw new NotFoundException(`Article not found`);
      }
      if (dto.categoryID) {
        const category = await this.em.findOne(Category, dto.categoryID);
        if (!category) throw new NotFoundException(`Category not found`);
        article.category = category;
      }
      const summary = await this.getSummaryFromAI(dto.content);
      article.summary = summary;

      if (file) {
        const photo: string = await this.awsService.bulkPutObject(
          file,
          `article/${article.id}`
        );
        article.imageURL = photo;
      }
      article.publishedAt = dto.publishedAt;
      article.description = dto.description;
      article.author = dto.author;
      article.title = dto.title;
      article.content = dto.content;
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
      if (!article) throw new NotFoundException(`Article not found`);
      article.deleted_at = new Date();
      await this.em.persistAndFlush(article);
    } catch (error) {
      this.logger.error("Calling deleteArticle()", error, ArticleService.name);
      throw error;
    }
  }

  private async getSummaryFromAI(content: string): Promise<string> {
    try {
      const aiServerUrl = this.configService.get<string>("AI_SERVER_URL");
      if (!aiServerUrl) {
        return "";
      }
      const response = await axios.post(
        aiServerUrl + "/summary",
        {
          text: content,
        },
        { timeout: 10000 }
      );
      return response.data.summary;
    } catch (error) {
      this.logger.error("Error calling AI server for summary", error);
      return "";
    }
  }
}
