import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Query } from "express-serve-static-core";
import { now } from "moment";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Article } from "src/entities/article.entity";
import { SearchDTO } from "./dto/search-dto.dto";
import Decimal from "decimal.js";
import { SearchResultDTO } from "./dto/search.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { CategoryDTO } from "../category/dtos/category.dto";
import {
  MAX_RECENT_ARTICLES_DATE,
  MAX_TRENDING_ARTICLES,
} from "src/common/constants/common";
import { CheckList } from "src/entities/checklist.entity";
@Injectable()
export class SearchService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @InjectRepository(CheckList)
    private readonly checklistRepository: EntityRepository<CheckList>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async searchArticle(searchDTO: SearchDTO, loginID: string) {
    try {
      if (!searchDTO.keyword) {
        searchDTO.keyword = "";
      }
      if (!searchDTO.toDate) {
        searchDTO.toDate = new Date();
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
      console.log(searchDTO.categories);
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
      if (loginID) {
        const res = await this.checklistRepository.find({
          user: { id: loginID },
        });
        articleCheckList = res.map((el) => el.article.id);
      }
      resultDTOs.forEach((resultDTO) => {
        if (articleCheckList.includes(resultDTO.id)) {
          resultDTO.isChecked = true;
        } else {
          resultDTO.isChecked = false;
        }
        resultDTO.category = plainToInstance(CategoryDTO, resultDTO.category);
      });
      const currentPage = Number(searchDTO.page >= 1 ? searchDTO.page : 1);
      const nextPage = currentPage + 1 <= numberOfPage ? currentPage + 1 : null;
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

  async getRecentArticle() {
    try {
      const queryObjDate = {};
      const currentDate = new Date();
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
      const articles = await this.articleRepository.find(
        {
          $and: [queryObjDate, { deleted_at: null }],
        },
        {
          orderBy: { publishedAt: "DESC" },
        }
      );
      const resultDTOs = plainToInstance(SearchResultDTO, articles);
      resultDTOs.forEach((resultDTO) => {
        resultDTO.category = plainToInstance(CategoryDTO, resultDTO.category);
      });
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

  async getTrendingArticle() {
    try {
      const articles = await this.articleRepository.find(
        {
          $and: [{ deleted_at: null }],
        },
        {
          orderBy: { publishedAt: "DESC", viewCount: "DESC" },
          limit: MAX_TRENDING_ARTICLES,
        }
      );
      const resultDTOs = plainToInstance(SearchResultDTO, articles);
      resultDTOs.forEach((resultDTO) => {
        resultDTO.category = plainToInstance(CategoryDTO, resultDTO.category);
      });
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
