import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GoogleLoginTypeDTO } from "./swagger_types/GoogleLogin.dto";
import { ApiResponseStatus } from "src/common/enum/common.enum";
import { BasicLogin } from "./dtos/BasicLogin.dto";
import { GoogleLogin } from "./dtos/GoogleLogin.dto";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Post("login/google")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: GoogleLoginTypeDTO,
  })
  async googleLogin(@Res() res: Response, @Req() req) {
    try {
      const firebaseInfo = req.firebaseUser;
      if (new Date(firebaseInfo.exp * 1000) < new Date()) {
        throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
      }

      const accessToken = await this.authService.googleLogin(firebaseInfo);
      res.status(200).json({
        message: "Login Successfully",
        status: ApiResponseStatus.SUCCESS,
        token: accessToken,
      });
    } catch (error) {
      this.logger.error("Calling login()", error, AuthController.name);
      throw error;
    }
  }

  @Post("login/google/v2")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    type: GoogleLoginTypeDTO,
  })
  async googleLoginV2(
    @Res() res: Response,
    @Req() req,
    @Body() loginDto: GoogleLogin
  ) {
    try {
      const accessToken = await this.authService.googleLoginV2(loginDto);
      res.status(200).json({
        message: "Login Successfully",
        status: ApiResponseStatus.SUCCESS,
        token: accessToken,
      });
    } catch (error) {
      this.logger.error("Calling login()", error, AuthController.name);
      throw error;
    }
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Res() res: Response, @Body() loginDto: BasicLogin) {
    try {
      const response = await this.authService.validateLogin(loginDto);
      res.status(200).json({
        message: "Login Successfully",
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      this.logger.error("Calling login()", error, AuthController.name);
      throw error;
    }
  }
}
