import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { SearchService } from "./search.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { SearchDTO } from "./dto/search-dto.dto";
import { Response } from "express";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
} from "src/common/enum/common.enum";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryDTO } from "../category/dtos/category.dto";
import { plainToInstance } from "class-transformer";
import { CategoryService } from "../category/category.service";
import { CustomAuthGuard } from "src/common/guards/custom-auth.guard";
import { log } from "console";
@ApiTags("search")
@Controller("search")
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly categoryService: CategoryService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // get all categories
  @Get("/categories")
  @ApiResponse({
    status: 200,
    type: [CategoryDTO],
  })
  async getAllCategory(
    @Res() res: Response,
    @Req() req,
    @Query("keyword") keyword: string
  ) {
    try {
      const cates = await this.categoryService.getAllCategory(keyword);
      const catesDTO = cates.map((el) => {
        const dto = plainToInstance(CategoryDTO, el);
        return dto;
      });
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get utilities successfully",
        data: {
          categories: catesDTO,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling findAllUtility()",
        error,
        SearchController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // search article
  @UseGuards(CustomAuthGuard)
  @Get()
  async searchArticle(
    @Res() res: Response,
    @Req() req,
    @Query(new ValidationPipe({ transform: true }))
    searchDTO: SearchDTO
  ) {
    try {
      const loginId = req.user ? req.user.id : null;
      const results = await this.searchService.searchArticle(
        searchDTO,
        loginId
      );
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get articles successfully",
        data: {
          ...results,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling searchArticle()",
        error,
        SearchController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // search article
  @UseGuards(CustomAuthGuard)
  @Get("recents")
  async getRecentArticle(@Res() res: Response, @Req() req) {
    try {
      const loginId = req.user ? req.user.id : null;
      const results = await this.searchService.getRecentArticle(loginId);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get articles successfully",
        data: results,
      });
    } catch (error) {
      this.logger.error(
        "Calling searchArticle()",
        error,
        SearchController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  @UseGuards(CustomAuthGuard)
  // search article
  @Get("trending")
  async getTrendingArticle(@Res() res: Response, @Req() req) {
    try {
      const loginId = req.user ? req.user.id : null;
      const results = await this.searchService.getTrendingArticle(loginId);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get articles successfully",
        data: results,
      });
    } catch (error) {
      this.logger.error(
        "Calling searchArticle()",
        error,
        SearchController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
