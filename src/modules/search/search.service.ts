import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Article } from "src/entities/article.entity";
import { SearchDTO } from "./dto/search-dto.dto";
import Decimal from "decimal.js";
import { SearchResultDTO } from "./dto/search.dto";
import { plainToInstance } from "class-transformer";
import { CategoryDTO } from "../category/dtos/category.dto";
import {
  MAX_RECENT_ARTICLES_DATE,
  MAX_TRENDING_ARTICLES,
} from "src/common/constants/common";
import { CheckList } from "src/entities/checklist.entity";
import { Vote } from "src/entities/vote.entity";
import { ar } from "@faker-js/faker";
@Injectable()
export class SearchService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @InjectRepository(CheckList)
    private readonly checklistRepository: EntityRepository<CheckList>,
    @InjectRepository(Vote)
    private readonly voteRepository: EntityRepository<Vote>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async searchArticle(searchDTO: SearchDTO, loginID: string) {
    try {
      if (!searchDTO.keyword) {
        searchDTO.keyword = "";
      }
      if (!searchDTO.toDate) {
        // to date plus one day
        searchDTO.toDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      }
      if (!searchDTO.categories) {
        searchDTO.categories = [];
      }
      const ftsearchQR = { $like: `%${searchDTO.keyword}%` };
      const queryObj = {};
      queryObj["$and"] = [
        {
          $or: [
            {
              author: ftsearchQR,
            },
            {
              title: ftsearchQR,
            },
            {
              content: ftsearchQR,
            },
            {
              description: ftsearchQR,
            },
            {
              category: {
                name: ftsearchQR,
              },
            },
          ],
        },
      ];

      const queryObjCategories = {};
      if (searchDTO.categories.length > 0) {
        queryObjCategories["$and"] = [
          {
            category: {
              id: { $in: searchDTO.categories },
            },
          },
        ];
      }

      const queryObjDate = {};
      if (searchDTO.fromDate) {
        queryObjDate["$and"] = [
          {
            publishedAt: {
              $gte: searchDTO.fromDate,
              $lt: searchDTO.toDate,
            },
          },
        ];
      } else {
        queryObjDate["$and"] = [
          {
            publishedAt: {
              $lt: searchDTO.toDate,
            },
          },
        ];
      }
      const limit =
        searchDTO.perPage && searchDTO.perPage >= 1 ? searchDTO.perPage : 10;
      const offset = searchDTO.page >= 1 ? limit * (searchDTO.page - 1) : 0;
      const articles = await this.articleRepository.find(
        {
          $and: [
            queryObj,
            queryObjCategories,
            queryObjDate,
            { deleted_at: null },
          ],
        },
        {
          populate: ["category"],
          limit: limit,
          offset: offset,
        }
      );
      const total = await this.articleRepository.count({
        $and: [
          queryObj,
          queryObjCategories,
          queryObjDate,
          { deleted_at: null },
        ],
      });
      const numberOfPage = new Decimal(total).div(limit).ceil().d[0];
      const resultDTOs = plainToInstance(SearchResultDTO, articles);
      let articleCheckList = [];
      let articleVotes = [];
      if (loginID) {
        const res = await this.checklistRepository.find({
          user: { id: loginID },
        });
        articleCheckList = res.map((el) => el.article.id);
        const voteRes = await this.voteRepository.find({
          user: { id: loginID },
        });
        articleVotes = voteRes.map((el) => el.article.id);
      }
      for (const resultDTO of resultDTOs) {
        resultDTO.isChecked = articleCheckList.includes(resultDTO.id);
        resultDTO.isVoted = articleVotes.includes(resultDTO.id);
        resultDTO.category = plainToInstance(CategoryDTO, resultDTO.category);
        resultDTO.voteCount = await this.voteRepository.count({
          article: { id: resultDTO.id },
        });
      }
      const currentPage = Number(searchDTO.page >= 1 ? searchDTO.page : 1);
      const nextPage = currentPage + 1 <= numberOfPage ? currentPage + 1 : null;
      console.log("resultDTOs", resultDTOs);
      return {
        articles: resultDTOs,
        metadata: {
          total: total,
          currentPage: currentPage,
          nextPage: nextPage,
          numberOfPage: numberOfPage,
        },
      };
    } catch (error) {
      this.logger.error("Calling searchArticle()", error, SearchService.name);
      throw error;
    }
  }

  async getRecentArticle(loginID: string, page: number) {
    try {
      if (!page) {
        page = 0;
      }
      const queryObjDate = {};
      const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const lastWeekDate = new Date(
        currentDate.getTime() - MAX_RECENT_ARTICLES_DATE * 24 * 60 * 60 * 1000
      );
      queryObjDate["$and"] = [
        {
          publishedAt: {
            $gte: lastWeekDate,
            $lt: currentDate,
          },
        },
      ];
      const offset = page >= 1 ? 10 * (page - 1) : 0;
      const articles = await this.articleRepository.find(
        {
          $and: [queryObjDate, { deleted_at: null }],
        },
        {
          orderBy: { publishedAt: "DESC" },
          limit: 10,
          offset: offset,
        }
      );
      const total = await this.articleRepository.count({
        $and: [queryObjDate, { deleted_at: null }],
      });
      const numberOfPage = new Decimal(total).div(10).ceil().d[0];
      const currentPage = Number(page >= 1 ? page : 1);
      const nextPage = currentPage + 1 <= numberOfPage ? currentPage + 1 : null;
      let articleCheckList = [];
      let articleVotes = [];
      if (loginID) {
        const res = await this.checklistRepository.find({
          user: { id: loginID },
        });
        articleCheckList = res.map((el) => el.article.id);
        const voteRes = await this.voteRepository.find({
          user: { id: loginID },
        });
        articleVotes = voteRes.map((el) => el.article.id);
      }
      const resultDTOs = plainToInstance(SearchResultDTO, articles);
      for (const resultDTO of resultDTOs) {
        resultDTO.isChecked = articleCheckList.includes(resultDTO.id);
        resultDTO.isVoted = articleVotes.includes(resultDTO.id);
        resultDTO.category = plainToInstance(CategoryDTO, resultDTO.category);
        resultDTO.voteCount = await this.voteRepository.count({
          article: { id: resultDTO.id },
        });
      }
      return {
        articles: resultDTOs,
        metadata: {
          total: total,
          currentPage: currentPage,
          nextPage: nextPage,
          numberOfPage: numberOfPage,
        },
      };
    } catch (error) {
      this.logger.error(
        "Calling getRecentArticle()",
        error,
        SearchService.name
      );
      throw error;
    }
  }

  async getTrendingArticle(loginID: string) {
    try {
      const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const lastWeekDate = new Date(
        currentDate.getTime() - MAX_RECENT_ARTICLES_DATE * 24 * 60 * 60 * 1000
      );

      const articles: [] = await this.em.getConnection().execute(
        `SELECT a.*, c.id as category_id, c.name as category_name , COUNT(v.id) as vote_count
        FROM articles a
        LEFT JOIN categories c ON a.category_id = c.id
        LEFT JOIN votes v ON a.id = v.article_id
        WHERE a.deleted_at IS NULL
        AND a.published_at >= ?
        AND a.published_at < ?
        GROUP BY a.id
        ORDER BY a.view_count DESC, vote_count DESC, a.published_at DESC
        LIMIT ?`,
        [lastWeekDate, currentDate, MAX_TRENDING_ARTICLES]
      );

      let articleCheckList = [];
      let articleVotes = [];
      if (loginID) {
        const res = await this.checklistRepository.find({
          user: { id: loginID },
        });
        articleCheckList = res.map((el) => el.article.id);
        const voteRes = await this.voteRepository.find({
          user: { id: loginID },
        });
        articleVotes = voteRes.map((el) => el.article.id);
      }
      const resultDTOs: SearchResultDTO[] = [];
      for (let index = 0; index < articles.length; index++) {
        let result = new SearchResultDTO();
        result.id = articles[index]["id"];
        result.title = articles[index]["title"];
        result.description = articles[index]["description"];
        result.content = articles[index]["content"];
        result.author = articles[index]["author"];
        result.publishedAt = articles[index]["published_at"];
        result.viewCount = articles[index]["view_count"];
        result.category = new CategoryDTO(
          articles[index]["category_name"],
          articles[index]["category_id"]
        );
        result.isChecked = articleCheckList.includes(result.id);
        result.isVoted = articleVotes.includes(result.id);
        result.voteCount = articles[index]["vote_count"];
        result.imageURL = articles[index]["image_url"];
        resultDTOs.push(result);
      }
      return resultDTOs;
    } catch (error) {
      this.logger.error(
        "Calling getRecentArticle()",
        error,
        SearchService.name
      );
      throw error;
    }
  }
}
