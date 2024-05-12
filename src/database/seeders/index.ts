import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";
import { Article } from "../../entities/article.entity";

export class ArticleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const articles = [];
    const cate = {
      id: uuidv4(),
      name: faker.music.genre(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    await em.insert(Category, cate);
    const cateDB = await em.findOneOrFail(Category, { id: cate.id });
    Array.from(Array(20).keys()).forEach(async () => {
      articles.push({
        id: uuidv4(),
        author: faker.name.fullName(),
        title: faker.lorem.sentences(1),
        description: faker.lorem.sentences(2),
        url: faker.internet.url(),
        imageURL: faker.image.imageUrl(),
        content: faker.lorem.paragraphs(4),
        publishedAt: faker.date.past(1),
        category: cateDB,
        created_at: new Date(),
        view_count: 0,
        vote_count: 0,
        updated_at: new Date(),
        deleted_at: null,
      });
    });
    await em.insertMany(Article, articles);
  }
}
