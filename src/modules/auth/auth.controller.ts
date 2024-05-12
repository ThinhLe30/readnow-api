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
import { LoginDto } from "./dtos/LoginDto.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { OAuth2Client } from "./google_client/google-client.config";
import { ApiResponse } from "@nestjs/swagger";
import { GoogleLoginTypeDTO } from "./swagger_types/GoogleLogin.dto";
import { ApiResponseStatus } from "src/common/enum/common.enum";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { BasicLogin } from "./dtos/BasicLogin.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly oauth2Client: OAuth2Client
  ) {}

  @Post("login/google")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: GoogleLoginTypeDTO,
  })
  async googleLogin(
    @Res() res: Response,
    @Req() req,
    @Body() loginDto: LoginDto
  ) {
    try {
      const firebaseInfo = req.firebaseUser;
      console.log(firebaseInfo);
      if (new Date(firebaseInfo.exp * 1000) < new Date()) {
        throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
      }

      const accessToken = await this.authService.googleLogin(firebaseInfo);
      console.log(accessToken);
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
