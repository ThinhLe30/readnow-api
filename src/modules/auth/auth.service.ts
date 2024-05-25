import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import { UsersService } from "../users/users.service";
import { UserRtnDto } from "./dtos/UserRtnDto.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "src/entities";
import { UserFirebase } from "./dtos/UserFirebase.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { randomUUID } from "crypto";
import { Role } from "src/common/enum/common.enum";
import { BasicLogin } from "./dtos/BasicLogin.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async googleLogin(firebaseUser: UserFirebase): Promise<string> {
    try {
      // Check if user exists
      const userDb = await this.userService.getUserByGoogleId(
        firebaseUser.userId
      );

      let userRtn: UserRtnDto;
      if (userDb == null) {
        // Insert user to db
        const user = new User();
        // generate uuid
        user.id = randomUUID();
        user.authId = firebaseUser.userId;
        user.email = firebaseUser.email;
        user.name = firebaseUser.name;
        user.role = Role.USER;
        user.photo = firebaseUser.picture;
        this.userRepository.persist(user).flush();
        userRtn = plainToInstance(UserRtnDto, user);
      } else {
        // Generate token
        userRtn = plainToInstance(UserRtnDto, userDb);
      }
      const accessToken = this.generateToken(userRtn);
      return accessToken;
    } catch (error) {
      this.logger.error("Calling googleLogin()", error, AuthService.name);
      throw error;
    }
  }

  generateToken = async (user: UserRtnDto): Promise<string> => {
    try {
      const accessToken = await this.jwtService.signAsync({
        ...user,
      });
      return accessToken;
    } catch (error) {
      this.logger.error("Calling generateToken()", error, AuthService.name);
      throw error;
    }
  };

  async validateLogin(loginDto: BasicLogin) {
    try {
      const userDb = await this.getUserByEmail(loginDto.email);
      if (!userDb)
        throw new HttpException(
          "Invalid email or password",
          HttpStatus.BAD_REQUEST
        );
      const isValidPass = await bcrypt.compare(
        loginDto.password,
        userDb.password
      );
      const user: UserRtnDto = plainToInstance(UserRtnDto, userDb);
      if (isValidPass) {
        const accessToken = await this.jwtService.signAsync({
          ...user,
        });
        return {
          token: accessToken,
        };
      } else {
        throw new HttpException(
          "Invalid email or password",
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const userDb = await this.userRepository.findOne({ email: email });
      return userDb;
    } catch (error) {
      throw error;
    }
  }
}
