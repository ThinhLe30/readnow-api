import {
  Controller,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleInteractService } from "./article_interact.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Response } from "express";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
} from "src/common/enum/common.enum";
import { CustomAuthGuard } from "src/common/guards/custom-auth.guard";

@Controller("article-interact")
@ApiTags("article-interact")
export class ArticleInteractController {
  constructor(
    private readonly articleInteractService: ArticleInteractService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Post("view/:id")
  async viewArticle(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      await this.articleInteractService.viewArticle(articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "view article successfully!",
      });
      // some code here
    } catch (error) {
      this.logger.error(
        "Calling viewArticle()",
        error,
        ArticleInteractController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  @UseGuards(CustomAuthGuard)
  @Post("checklist/:id")
  async addChecklist(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      const idLogined = req.user.id;
      await this.articleInteractService.addChecklist(idLogined, articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Add/Remove checklist successfully!",
      });
      // some code here
    } catch (error) {
      this.logger.error(
        "Calling addChecklist()",
        error,
        ArticleInteractController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
  @UseGuards(CustomAuthGuard)
  @Post("vote/:id")
  async addVote(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      const idLogined = req.user.id;
      await this.articleInteractService.addVote(idLogined, articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Add/Remove vote successfully!",
      });
      // some code here
    } catch (error) {
      this.logger.error(
        "Calling addVote()",
        error,
        ArticleInteractController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
