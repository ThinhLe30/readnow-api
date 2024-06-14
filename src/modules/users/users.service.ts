import { EntityRepository } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/mysql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { User } from "src/entities";
import * as bcrypt from "bcrypt";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { UserDTO } from "./dtos/user.dto";
import { plainToInstance } from "class-transformer";
import { AddUserBasicDTO } from "./dtos/AddUserBasic.dto";
import { Role } from "src/common/enum/common.enum";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async getAllUsers(keyword: string): Promise<UserDTO[]> {
    try {
      if (!keyword) keyword = "";
      const likeQr = { $like: `%${keyword}%` };
      const queryObj = {
        $or: [{ name: likeQr }, { email: likeQr }, { role: likeQr }],
      };
      const users = await this.userRepository.find(queryObj);
      const userDTOs = users.map((el) => {
        const dto = plainToInstance(UserDTO, el);
        return dto;
      });
      return userDTOs;
    } catch (error) {
      this.logger.error("Calling getAllUsers()", error, UsersService.name);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (!user) return null;
      return user;
    } catch (error) {
      this.logger.error("Calling getUserByEmail()", error, UsersService.name);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ id: id });
      if (!user) throw new NotFoundException(`Can not find user`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByGoogleId(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ authId: id });
      if (!user) return null;
      return user;
    } catch (error) {
      this.logger.error(
        "Calling getUserByGoogleId()",
        error,
        UsersService.name
      );
      throw error;
    }
  }

  async hashPassword(password: string) {
    try {
      const saltRounds = 10; // Số lần lặp để tạo salt, thay đổi tùy ý
      return bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: AddUserBasicDTO) {
    try {
      const newUser = new User();
      newUser.id = uuidv4();
      newUser.email = user.email;
      newUser.password = await this.hashPassword(user.password);
      newUser.name = user.name;
      newUser.role = Role.ADMIN;
      newUser.photo = faker.image.avatarGitHub();
      newUser.created_at = new Date();
      newUser.updated_at = new Date();
      await this.em.persistAndFlush(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const count = await this.userRepository.count({ id: id });
      if (count == 0) {
        throw new NotFoundException(`Can not find user`);
      }
      await this.em.removeAndFlush({ id: id });
    } catch (error) {
      throw error;
    }
  }
}
