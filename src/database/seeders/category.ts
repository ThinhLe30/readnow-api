import { UuidType, type EntityManager } from "@mikro-orm/core";
import { Seeder, faker } from "@mikro-orm/seeder";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../entities/category.entity";

export class CategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const cates = [];
    Array.from(Array(20).keys()).forEach(async () => {
      cates.push({
        id: uuidv4(),
        name: faker.music.genre(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    });
    em.insertMany(Category, cates);
  }
}
