import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // async hashPassword(password: string) {
  //   try {
  //     const saltRounds = 10; // Số lần lặp để tạo salt, thay đổi tùy ý
  //     return bcrypt.hash(password, saltRounds);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async duplicatedEmail(email: string) {
    try {
      const count = await this.em.count('User', { email: email });
      if (count < 1) return false;
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (!user) return null;
      return user;
    } catch (error) {
      this.logger.error('Calling getUserByEmail()', error, UsersService.name);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ id: id });
      if (!user)
        throw new NotFoundException(`Can not find user with id: ${id}`);
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
        'Calling getUserByGoogleId()',
        error,
        UsersService.name,
      );
      throw error;
    }
  }
}