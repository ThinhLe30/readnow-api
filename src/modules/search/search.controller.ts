import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Req,
  Res,
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
@Controller("search")
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // search article
  @Get()
  async searchArticle(
    @Res() res: Response,
    @Req() req,
    @Query(new ValidationPipe({ transform: true }))
    searchDTO: SearchDTO
  ) {
    try {
      const results = await this.searchService.searchArticle(searchDTO);
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
  @Get("recents")
  async getRecentArticle(@Res() res: Response, @Req() req) {
    try {
      const results = await this.searchService.getRecentArticle();
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get articles successfully",
        data: {
          results,
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
}
