import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Category } from "src/entities/category.entity";
import { CategoryAddDTO } from "./dtos/category.add.dto";
import { plainToInstance } from "class-transformer";
import { v4 as uuidv4 } from "uuid";
import { CategoryUpdateDTO } from "./dtos/category.update.dto";

@Injectable()
export class CategoryService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async getAllCategory(keyword: string): Promise<Category[]> {
    try {
      if (!keyword) keyword = "";
      const likeQr = { $like: `%${keyword}%` };
      const queryObj = {
        $and: [{ name: likeQr }],
      };
      const categories = await this.categoryRepository.find(queryObj);
      return categories;
    } catch (error) {
      this.logger.error(
        "Calling getAllCategory()",
        error,
        CategoryService.name
      );
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ id: id });
      if (!category) return null;
      return category;
    } catch (error) {
      this.logger.error(
        "Calling getCategoryById()",
        error,
        CategoryService.name
      );
      throw error;
    }
  }

  async createCategory(dto: CategoryAddDTO) {
    try {
      let category = plainToInstance(Category, dto);
      category.id = uuidv4();
      category.created_at = new Date();
      category.updated_at = new Date();
      category.deleted_at = null;
      await this.em.persistAndFlush(category);
    } catch (error) {
      this.logger.error(
        "Calling createCategory()",
        error,
        CategoryService.name
      );
      throw error;
    }
  }

  async updateCategory(id: string, dto: CategoryUpdateDTO) {
    try {
      let category = await this.em.findOne(Category, { id: id });
      if (!category)
        throw new NotFoundException(`Can not find category with id: ${id}`);
      category.name = dto.name;
      category.updated_at = new Date();
      await this.em.persistAndFlush(category);
    } catch (error) {
      this.logger.error(
        "Calling updateCategory()",
        error,
        CategoryService.name
      );
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      let category = await this.categoryRepository.findOne({ id: id });
      if (!category)
        throw new NotFoundException(`Can not find category with id: ${id}`);
      await this.em.removeAndFlush(category);
    } catch (error) {
      this.logger.error(
        "Calling deleteCategory()",
        error,
        CategoryService.name
      );
      throw error;
    }
  }
}
