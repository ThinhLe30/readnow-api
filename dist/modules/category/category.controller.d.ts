import { Logger } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryAddDTO } from "./dtos/category.add.dto";
import { CategoryUpdateDTO } from "./dtos/category.update.dto";
export declare class CategoryController {
    private readonly categoryService;
    private readonly logger;
    constructor(categoryService: CategoryService, logger: Logger);
    getAllCategory(res: Response, req: any, keyword: string): Promise<void>;
    getCategoryById(res: Response, req: any, categoryID: string): Promise<void>;
    createCategory(res: Response, req: any, dto: CategoryAddDTO): Promise<void>;
    updateCategory(res: Response, req: any, dto: CategoryUpdateDTO, id: string): Promise<void>;
    deleteCategory(res: Response, req: any, categoryID: string): Promise<void>;
}
