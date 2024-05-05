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
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { CategoryService } from "./category.service";
import { CategoryAddDTO } from "./dtos/category.add.dto";
import { CategoryDTO } from "./dtos/category.dto";
import { CategoryUpdateDTO } from "./dtos/category.update.dto";
import { plainToInstance } from "class-transformer";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
} from "src/common/enum/common.enum";

@Controller("categories")
@ApiTags("categories")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // get all categories
  @Get()
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
        CategoryController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // get category by id
  @Get(":id")
  @ApiResponse({
    status: 200,
    type: CategoryDTO,
  })
  async getCategoryById(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) categoryID: string
  ) {
    try {
      const cate = await this.categoryService.getCategoryById(categoryID);
      if (!cate) {
        res.status(ApiResponseErrorCode.NOT_FOUND).json({
          status: ApiResponseStatus.FAILURE,
          message: "Category not found",
        });
      }
      const cateDTO = plainToInstance(CategoryDTO, cate);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get category successfully",
        data: {
          category: cateDTO,
        },
      });
    } catch (error) {
      this.logger.error(
        "Calling getCategoryById()",
        error,
        CategoryController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // create category
  @Post()
  @ApiResponse({
    status: 200,
  })
  async createCategory(
    @Res() res: Response,
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) dto: CategoryAddDTO
  ) {
    try {
      await this.categoryService.createCategory(dto);
      res.status(ApiResponseErrorCode.CREATED).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Create category successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling createCategory()",
        error,
        CategoryController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // update category
  @Put(":id")
  @ApiResponse({
    status: 200,
  })
  async updateCategory(
    @Res() res: Response,
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) dto: CategoryUpdateDTO,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    try {
      await this.categoryService.updateCategory(id, dto);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Update category successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling updateCategory()",
        error,
        CategoryController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // delete category
  @Delete(":id")
  @ApiResponse({
    status: 200,
  })
  async deleteCategory(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) categoryID: string
  ) {
    try {
      await this.categoryService.deleteCategory(categoryID);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Delete category successfully",
      });
    } catch (error) {
      this.logger.error(
        "Calling deleteCategory()",
        error,
        CategoryController.name
      );
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
