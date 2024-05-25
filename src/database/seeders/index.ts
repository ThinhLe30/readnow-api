import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";
import { Article } from "../../entities/article.entity";
import { Role } from "../../common/enum/common.enum";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcrypt";
import { data } from "./article";

export class AllSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // insert admin user
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
    // insert custom category
    const categories = [
      "Top",
      "Thể thao",
      "Công nghệ",
      "Kinh doanh",
      "Khoa học",
      "Giải trí",
      "Sức khoẻ",
      "Thế giới",
      "Chính trị",
      "Môi trường",
      "Ẩm thực",
    ];
    categories.forEach(async (name) => {
      const cate = {
        id: uuidv4(),
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      await em.insert(Category, cate);
    });
    const catesDB = await em.find(Category, {});
    const articles = [];
    catesDB.forEach(async (cate, i) => {
      Array.from(Array(10).keys()).forEach(async () => {
        var item = data[Math.floor(Math.random() * data.length)];
        articles.push({
          id: uuidv4(),
          author: item.Author,
          title: item.Title,
          description: item.Summary,
          summary: item.Summary,
          url: faker.internet.url(),
          imageURL:
            "https://imagev3.vietnamplus.vn/600x315/Uploaded/2024/mzdic/2024_05_14/indonesia-u16-1405-2059.jpg.webp",
          content: item.Contents,
          publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
          category: cate,
          created_at: new Date(),
          view_count: Math.floor(Math.random() * 1000) + 1,
          updated_at: new Date(),
          deleted_at: null,
        });
      });
    });
    await em.insertMany(Article, articles);
  }
  async hashPassword(password: string) {
    try {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw error;
    }
  }
}
