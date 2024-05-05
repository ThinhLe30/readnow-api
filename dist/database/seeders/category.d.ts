import { type EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
export declare class CategorySeeder extends Seeder {
    run(em: EntityManager): Promise<void>;
}
