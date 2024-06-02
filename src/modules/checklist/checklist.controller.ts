import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { ChecklistService } from "./checklist.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
  Role,
} from "src/common/enum/common.enum";
import { Response } from "express";
import { plainToInstance } from "class-transformer";
import { CategoryController } from "../category/category.controller";
import { CategoryDTO } from "../category/dtos/category.dto";
import { SearchResultDTO } from "../search/dto/search.dto";
@ApiTags("categories")
@UseGuards(JwtAuthGuard)
@Controller("checklist")
export class ChecklistController {
  constructor(
    private readonly checkListService: ChecklistService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @UseGuards(RoleAuthGuard([Role.ADMIN, Role.USER]))
  @Get()
  @ApiResponse({
    status: 200,
    type: [SearchResultDTO],
  })
  async getMyChecklist(@Res() res: Response, @Req() req) {
    try {
      const loginId = req.user.id;
      const checkLists = await this.checkListService.getMycheckList(loginId);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get my checklist successfully",
        data: {
          articles: checkLists,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling getMyChecklist()",
        error,
        ChecklistController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
