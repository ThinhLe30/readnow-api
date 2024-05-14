import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ArticleDTO } from "./dtos/article.dto";
import { Response } from "express";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
} from "src/common/enum/common.enum";
import { ArticleAddDTO } from "./dtos/article.add.dto";
import { plainToInstance } from "class-transformer";
import { CategoryDTO } from "../category/dtos/category.dto";
import { ArticleUpdateDTO } from "./dtos/article.update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "./helpers/file-filter.helper";
@Controller("articles")
@ApiTags("articles")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // get all article
  @Get()
  @ApiResponse({
    status: 200,
    type: [ArticleDTO],
  })
  async getAllArticle(
    @Res() res: Response,
    @Req() req,
    @Query("keyword") keyword: string
  ) {
    try {
      const articles = await this.articleService.getAllArticle(keyword);
      const articlesDTO = articles.map((el) => {
        const dto = plainToInstance(ArticleDTO, el);
        dto.category = plainToInstance(CategoryDTO, dto.category);
        return dto;
      });
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get articles successfully",
        data: {
          articles: articlesDTO,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling getAllArticle()",
        error,
        ArticleController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // get article by id
  @Get(":id")
  @ApiResponse({
    status: 200,
    type: ArticleDTO,
  })
  async getArticleByID(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      const article = await this.articleService.getArticleById(articleID);
      if (!article) {
        res.status(ApiResponseErrorCode.NOT_FOUND).json({
          status: ApiResponseStatus.FAILURE,
          message: "Article not found",
        });
        return;
      }
      const articleDTO = plainToInstance(ArticleDTO, article);
      articleDTO.category = plainToInstance(CategoryDTO, articleDTO.category);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get article successfully",
        data: {
          article: articleDTO,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling getArticleByID()",
        error,
        ArticleController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // create article
  @Post()
  @ApiResponse({
    status: 200,
  })
  @UseInterceptors(FileInterceptor("image", fileFilter))
  async createCategory(
    @Res() res: Response,
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) dto: ArticleAddDTO,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    try {
      await this.articleService.createArticle(file, dto);
      res.status(ApiResponseErrorCode.CREATED).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Create article successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling createCategory()",
        error,
        ArticleController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // update article
  @Put(":id")
  @ApiResponse({
    status: 200,
  })
  @UseInterceptors(FileInterceptor("image", fileFilter))
  async updateCategory(
    @Res() res: Response,
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) dto: ArticleUpdateDTO,
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    try {
      await this.articleService.updateArticle(file, dto, id);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Update article successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling updateCategory()",
        error,
        ArticleController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // delete article
  @Delete(":id")
  @ApiResponse({
    status: 200,
  })
  async deleteCategory(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      await this.articleService.deleteArticle(articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Delete article successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling deleteCategory()",
        error,
        ArticleController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
