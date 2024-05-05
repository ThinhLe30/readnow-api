import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Logger } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { CategoryAddDTO } from "./dtos/category.add.dto";
import { CategoryUpdateDTO } from "./dtos/category.update.dto";
export declare class CategoryService {
    private readonly em;
    private readonly categoryRepository;
    private readonly logger;
    constructor(em: EntityManager, categoryRepository: EntityRepository<Category>, logger: Logger);
    getAllCategory(keyword: string): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category>;
    createCategory(dto: CategoryAddDTO): Promise<void>;
    updateCategory(id: string, dto: CategoryUpdateDTO): Promise<void>;
    deleteCategory(id: string): Promise<void>;
}
