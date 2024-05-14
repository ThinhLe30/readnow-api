import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";
import { Article } from "../../entities/article.entity";
import { Role } from "../../common/enum/common.enum";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcrypt";

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
      "Sports",
      "Technology",
      "Business",
      "Science",
      "Entertainment",
      "Health",
      "World",
      "Politics",
      "Environment",
      "Food",
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
    catesDB.forEach(async (cate) => {
      Array.from(Array(10).keys()).forEach(async () => {
        articles.push({
          id: uuidv4(),
          author: "Trương Anh Ngọc",
          title:
            "Indonesia đăng cai Giải Vô địch Bóng đá U16 và U19 Đông Nam Á 2024",
          description:
            "Giải Vô địch Bóng đá U16 AFF 2024 sẽ được tổ chức tại Solo từ ngày 21/6 đến ngày 4/7, trong khi giải Vô địch Bóng đá U19 sẽ diễn ra từ ngày 17/ 7 đến ngày 29/7.AFF Cup đổi tên thành ASEAN Cup, chốt thời gian bốc thăm chia bảngChủ tịch AFF ấn tượng với những tiến bộ của bóng đá Việt NamAFF Cup 2022: Thái Lan và Việt Nam thắng thế ở đội hình tiêu biểu",
          url: faker.internet.url(),
          imageURL:
            "https://imagev3.vietnamplus.vn/600x315/Uploaded/2024/mzdic/2024_05_14/indonesia-u16-1405-2059.jpg.webp",
          content:
            "Indonesia đã được chọn đăng cai Giải Vô địch Bóng đá U16 và U19 do Liên đoàn Bóng đá ASEAN (AFF) tổ chức, dự kiến diễn ra vào tháng 6 và tháng 7/ 2024. Theo phóng viên TTXVN tại Jakarta, AFF thông báo trên tài khoản Instagram ngày 13/5 cho biết, Giải Vô địch Bóng đá U16 AFF 2024 sẽ được tổ chức tại Sân vận động Manahan và Sân vận động Sriwedari ở Solo, Indonesia, từ ngày 21/6 đến ngày 4/7. Trong khi đó, Giải Vô địch Bóng đá U19 sẽ diễn ra trên Sân vận động Gelora Bung Tomo và Sân vận động Gelora ở Surabaya, Indonesia, từ ngày 17/ 7 đến ngày 29/7. Theo Liên đoàn Bóng đá Indonesia, Đội tuyển U16 Indonesia được ông Nova Arianto, trợ lý Huấn luyện viên đội tuyển quốc gia dẫn dắt, trong khi đội U19 được đặt dưới sự hướng dẫn của Huấn luyện viên Indra Sjafri. Trước đó, Indonesia đã đăng cai tổ chức AFF U16 vào năm 2022 tại Yogyakarta, nơi đội tuyển trẻ quốc gia này đã lên ngôi vô địch sau khi đánh bại Việt Nam tại sân vận động Maguwoharjo./. AFF quyết định đổi tên giải đấu cao nhất cấp độ Đội tuyển Quốc gia khu vực Đông Nam Á từ AFF Cup thành ASEAN Cup, đồng thời ra mắt bộ logo mới của ASEAN Cup 2024.",
          publishedAt: faker.date.between(new Date("2024-05-01"), new Date()),
          category: cate,
          created_at: new Date(),
          view_count: Math.floor(Math.random() * 1000) + 1,
          vote_count: 0,
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
