import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseStatus } from "src/common/enum/common.enum";
import { UserRtnDto } from "../auth/dtos/UserRtnDto.dto";
import { plainToInstance } from "class-transformer";
import { AddUserBasicDTO } from "./dtos/AddUserBasic.dto";

// @UseGuards(JwtAuthGuard)
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

  // @Post()
  // async addUser(
  //   @Res() res: Response,
  //   @Req() req,
  //   @Body(new ValidationPipe({ transform: true })) userDto: AddUserBasicDTO
  // ) {
  //   try {
  //     await this.usersService.addUser(userDto);
  //     res.status(200).json({
  //       message: "Added user successfully",
  //       status: "success",
  //     });
  //   } catch (error) {
  //     this.logger.error("Calling addUser()", error, UsersController.name);
  //     throw error;
  //   }
  // }
}
