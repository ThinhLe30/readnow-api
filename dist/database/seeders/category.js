"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySeeder = void 0;
const seeder_1 = require("@mikro-orm/seeder");
const uuid_1 = require("uuid");
const category_entity_1 = require("../../entities/category.entity");
class CategorySeeder extends seeder_1.Seeder {
    async run(em) {
        const cates = [];
        Array.from(Array(20).keys()).forEach(async () => {
            cates.push({
                id: (0, uuid_1.v4)(),
                name: seeder_1.faker.music.genre(),
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            });
        });
        em.insertMany(category_entity_1.Category, cates);
    }
}
exports.CategorySeeder = CategorySeeder;
//# sourceMappingURL=category.js.map