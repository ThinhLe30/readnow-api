import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";
import * as bcrypt from "bcrypt";
import { User } from "../../entities";
import { Role } from "../../common/enum/common.enum";

export class AllSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = [];
    const user = {
      id: uuidv4(),
      authId: faker.git.commitSha(),
      name: faker.name.findName(),
      role: Role.ADMIN,
      email: "admin@gmail.com",
      password: await this.hashPassword("123456"),
      photo: faker.image.avatar(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    em.insert(User, user);
  }

  async hashPassword(password: string) {
    try {
      const saltRounds = 10; // Số lần lặp để tạo salt, thay đổi tùy ý
      return bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw error;
    }
  }
}
