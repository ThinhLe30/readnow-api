import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";
import { Article } from "../../entities/article.entity";
import { Role } from "../../common/enum/common.enum";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcrypt";
import {
  ban_doc,
  cong_doan,
  giao_duc,
  kinh_doanh,
  media,
  phap_luat,
  suc_khoe,
  the_gioi,
  the_thao,
  thoi_su,
  xa_hoi,
} from "./article";

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
    await em.insert(User, user);
    for (let i = 0; i < 20; i++) {
      const user = {
        id: uuidv4(),
        authId: faker.git.commitSha(),
        name: faker.name.fullName(),
        role: Role.USER,
        email: faker.internet.email(),
        password: await this.hashPassword("123456"),
        photo: faker.image.avatar(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      await em.insert(User, user);
    }
    let articles = [];
    const ban_doc_cate = {
      id: uuidv4(),
      name: "Bạn đọc",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, ban_doc_cate);

    ban_doc.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: ban_doc_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const cong_doan_cate = {
      id: uuidv4(),
      name: "Công đoàn",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, cong_doan_cate);
    cong_doan.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: cong_doan_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const giao_duc_cate = {
      id: uuidv4(),
      name: "Giáo dục",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, giao_duc_cate);
    giao_duc.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: giao_duc_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const kinh_doanh_cate = {
      id: uuidv4(),
      name: "Kinh doanh",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, kinh_doanh_cate);
    kinh_doanh.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: kinh_doanh_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const the_thao_cate = {
      id: uuidv4(),
      name: "Thể thao",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, the_thao_cate);
    the_thao.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: the_thao_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const media_cate = {
      id: uuidv4(),
      name: "Media",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, media_cate);
    media.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: media_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const phap_luat_cate = {
      id: uuidv4(),
      name: "Pháp luật",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, phap_luat_cate);
    phap_luat.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: phap_luat_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const suc_khoe_cate = {
      id: uuidv4(),
      name: "Sức khỏe",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, suc_khoe_cate);
    suc_khoe.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: suc_khoe_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const the_gioi_cate = {
      id: uuidv4(),
      name: "Thế giới",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, the_gioi_cate);
    the_gioi.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: the_gioi_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
      });
    });

    const thoi_su_cate = {
      id: uuidv4(),
      name: "Thời sự",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, thoi_su_cate);
    thoi_su.forEach((item) => {
      articles.push({
        id: uuidv4(),
        author: item["Author(s)"],
        title: item.Title,
        description: item.Summary,
        summary: item.Summary,
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(800, 600, "nature", true),
        content: item.Contents,
        publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
        category_id: thoi_su_cate.id,
        created_at: new Date(),
        view_count: Math.floor(Math.random() * 1000000) + 1,
        updated_at: new Date(),
        deleted_at: null,
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
