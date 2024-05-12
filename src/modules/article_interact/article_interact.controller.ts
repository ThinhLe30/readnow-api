import {
  Controller,
  Delete,
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
  Role,
} from "src/common/enum/common.enum";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("article-interact")
@ApiTags("article-interact")
export class ArticleInteractController {
  constructor(
    private readonly articleInteractService: ArticleInteractService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @UseGuards(RoleAuthGuard([Role.ADMIN, Role.USER]))
  @Post("vote/:id")
  async voteArticle(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      await this.articleInteractService.voteArticle(articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Vote article successfully!",
      });
      // some code here
    } catch (error) {
      this.logger.error(
        "Calling voteArticle()",
        error,
        ArticleInteractController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  @UseGuards(RoleAuthGuard([Role.ADMIN, Role.USER]))
  @Post("un-vote/:id")
  async unvoteArticle(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      await this.articleInteractService.unVoteArticle(articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Un-vote article successfully!",
      });
      // some code here
    } catch (error) {
      this.logger.error(
        "Calling unvoteArticle()",
        error,
        ArticleInteractController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  @UseGuards(RoleAuthGuard([Role.ADMIN, Role.USER]))
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

  @UseGuards(RoleAuthGuard([Role.ADMIN, Role.USER]))
  @Post("checklist/:id/add")
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
        message: "Add checklist successfully!",
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

  @Delete("checklist/:id/remove")
  async removeChecklist(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) articleID: string
  ) {
    try {
      // some code here
      const idLogined = req.user.id;
      await this.articleInteractService.removeChecklist(idLogined, articleID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Remove checklist successfully!",
      });
    } catch (error) {
      this.logger.error(
        "Calling removeChecklist()",
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
