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
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "./users.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ApiResponseErrorCode,
  ApiResponseStatus,
  Role,
} from "src/common/enum/common.enum";
import { UserRtnDto } from "../auth/dtos/UserRtnDto.dto";
import { plainToInstance } from "class-transformer";
import { AddUserBasicDTO } from "./dtos/AddUserBasic.dto";
import { UserDTO } from "./dtos/user.dto";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";

@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @ApiResponse({
    status: 200,
    type: UserRtnDto,
  })
  @Get("/me")
  async getCurrentUserInfo(@Res() res, @Req() req) {
    try {
      const user = await this.usersService.getUserByEmail(req.user.email);
      return res.status(200).json({
        message: "Get current user info successfully",
        status: ApiResponseStatus.SUCCESS,
        data: plainToInstance(UserRtnDto, user),
      });
    } catch (error) {
      this.logger.error(
        "Calling getCurrentUserInfo()",
        error,
        UsersController.name
      );
      throw error;
    }
  }

  // get all categories
  @UseGuards(RoleAuthGuard([Role.ADMIN]))
  @Get()
  @ApiResponse({
    status: 200,
    type: [UserDTO],
  })
  async getAllUser(
    @Res() res: Response,
    @Req() req,
    @Query("keyword") keyword: string
  ) {
    try {
      const users = await this.usersService.getAllUsers(keyword);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get users successfully",
        data: {
          users: users,
        },
      });
    } catch (error) {
      this.logger.error("Calling getAllUser()", error, UsersController.name);
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // get user by id
  @UseGuards(RoleAuthGuard([Role.ADMIN]))
  @Get(":id")
  @ApiResponse({
    status: 200,
    type: UserDTO,
  })
  async getUserByID(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) {
        res.status(ApiResponseErrorCode.NOT_FOUND).json({
          status: ApiResponseStatus.FAILURE,
          message: "User not found",
        });
        return;
      }
      const dto = plainToInstance(UserDTO, user);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Get user successfully",
        data: {
          user: dto,
        },
      });
    } catch (error) {
      this.logger.error("Calling getUserByID()", error, UsersController.name);
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // create article
  @UseGuards(RoleAuthGuard([Role.ADMIN]))
  @Post()
  @ApiResponse({
    status: 200,
  })
  async createUser(
    @Res() res: Response,
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) dto: AddUserBasicDTO
  ) {
    try {
      await this.usersService.createUser(dto);
      res.status(ApiResponseErrorCode.CREATED).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Create user successfully",
      });
    } catch (error) {
      this.logger.error("Calling createUser()", error, UsersController.name);
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }

  // delete category
  @UseGuards(RoleAuthGuard([Role.ADMIN]))
  @Delete(":id")
  @ApiResponse({
    status: 200,
  })
  async deleteUser(
    @Res() res: Response,
    @Req() req,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    try {
      await this.usersService.deleteUser(id);
      res.status(ApiResponseErrorCode.SUCCESS).json({
        status: ApiResponseStatus.SUCCESS,
        message: "Delete user successfully",
      });
    } catch (error) {
      this.logger.error("Calling deleteUser()", error, UsersController.name);
      res.status(error.status).json({
        status: ApiResponseStatus.FAILURE,
        message: error.message,
      });
    }
  }
}
