"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const category_entity_1 = require("../../entities/category.entity");
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
let CategoryService = exports.CategoryService = CategoryService_1 = class CategoryService {
    constructor(em, categoryRepository, logger) {
        this.em = em;
        this.categoryRepository = categoryRepository;
        this.logger = logger;
    }
    async getAllCategory(keyword) {
        try {
            if (!keyword)
                keyword = "";
            const likeQr = { $like: `%${keyword}%` };
            const queryObj = {
                $and: [{ name: likeQr }],
            };
            const categories = await this.categoryRepository.find(queryObj);
            return categories;
        }
        catch (error) {
            this.logger.error("Calling getAllCategory()", error, CategoryService_1.name);
            throw error;
        }
    }
    async getCategoryById(id) {
        try {
            const category = await this.categoryRepository.findOne({ id: id });
            if (!category)
                return null;
            return category;
        }
        catch (error) {
            this.logger.error("Calling getCategoryById()", error, CategoryService_1.name);
            throw error;
        }
    }
    async createCategory(dto) {
        try {
            let category = (0, class_transformer_1.plainToInstance)(category_entity_1.Category, dto);
            category.id = (0, uuid_1.v4)();
            category.created_at = new Date();
            category.updated_at = new Date();
            category.deleted_at = null;
            await this.em.persistAndFlush(category);
        }
        catch (error) {
            this.logger.error("Calling createCategory()", error, CategoryService_1.name);
            throw error;
        }
    }
    async updateCategory(id, dto) {
        try {
            let category = await this.em.findOne(category_entity_1.Category, { id: id });
            if (!category)
                throw new common_1.NotFoundException(`Can not find category with id: ${id}`);
            category.name = dto.name;
            category.updated_at = new Date();
            await this.em.persistAndFlush(category);
        }
        catch (error) {
            this.logger.error("Calling updateCategory()", error, CategoryService_1.name);
            throw error;
        }
    }
    async deleteCategory(id) {
        try {
            let category = await this.categoryRepository.findOne({ id: id });
            if (!category)
                throw new common_1.NotFoundException(`Can not find category with id: ${id}`);
            await this.em.removeAndFlush(category);
        }
        catch (error) {
            this.logger.error("Calling deleteCategory()", error, CategoryService_1.name);
            throw error;
        }
    }
};
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [core_1.EntityManager,
        core_1.EntityRepository,
        common_1.Logger])
], CategoryService);
//# sourceMappingURL=category.service.js.map