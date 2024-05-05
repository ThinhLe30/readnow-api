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
var CategoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const category_service_1 = require("./category.service");
const category_add_dto_1 = require("./dtos/category.add.dto");
const category_dto_1 = require("./dtos/category.dto");
const category_update_dto_1 = require("./dtos/category.update.dto");
const class_transformer_1 = require("class-transformer");
const common_enum_1 = require("../../common/enum/common.enum");
let CategoryController = exports.CategoryController = CategoryController_1 = class CategoryController {
    constructor(categoryService, logger) {
        this.categoryService = categoryService;
        this.logger = logger;
    }
    async getAllCategory(res, req, keyword) {
        try {
            const cates = await this.categoryService.getAllCategory(keyword);
            const catesDTO = cates.map((el) => {
                const dto = (0, class_transformer_1.plainToInstance)(category_dto_1.CategoryDTO, el);
                return dto;
            });
            res.status(common_enum_1.ApiResponseErrorCode.SUCCESS).json({
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                message: "Get utilities successfully",
                data: {
                    categories: catesDTO,
                },
            });
        }
        catch (error) {
            this.logger.error("Calling findAllUtility()", error, CategoryController_1.name);
            res.status(error.status).json({
                status: common_enum_1.ApiResponseStatus.FAILURE,
                message: error.message,
            });
        }
    }
    async getCategoryById(res, req, categoryID) {
        try {
            const cate = await this.categoryService.getCategoryById(categoryID);
            if (!cate) {
                res.status(common_enum_1.ApiResponseErrorCode.NOT_FOUND).json({
                    status: common_enum_1.ApiResponseStatus.FAILURE,
                    message: "Category not found",
                });
            }
            const cateDTO = (0, class_transformer_1.plainToInstance)(category_dto_1.CategoryDTO, cate);
            res.status(common_enum_1.ApiResponseErrorCode.SUCCESS).json({
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                message: "Get category successfully",
                data: {
                    category: cateDTO,
                },
            });
        }
        catch (error) {
            this.logger.error("Calling getCategoryById()", error, CategoryController_1.name);
            res.status(error.status).json({
                status: common_enum_1.ApiResponseStatus.FAILURE,
                message: error.message,
            });
        }
    }
    async createCategory(res, req, dto) {
        try {
            await this.categoryService.createCategory(dto);
            res.status(common_enum_1.ApiResponseErrorCode.CREATED).json({
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                message: "Create category successfully",
            });
        }
        catch (error) {
            this.logger.error("Calling createCategory()", error, CategoryController_1.name);
            res.status(error.status).json({
                status: common_enum_1.ApiResponseStatus.FAILURE,
                message: error.message,
            });
        }
    }
    async updateCategory(res, req, dto, id) {
        try {
            await this.categoryService.updateCategory(id, dto);
            res.status(common_enum_1.ApiResponseErrorCode.SUCCESS).json({
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                message: "Update category successfully",
            });
        }
        catch (error) {
            this.logger.error("Calling updateCategory()", error, CategoryController_1.name);
            res.status(error.status).json({
                status: common_enum_1.ApiResponseStatus.FAILURE,
                message: error.message,
            });
        }
    }
    async deleteCategory(res, req, categoryID) {
        try {
            await this.categoryService.deleteCategory(categoryID);
            res.status(common_enum_1.ApiResponseErrorCode.SUCCESS).json({
                status: common_enum_1.ApiResponseStatus.SUCCESS,
                message: "Delete category successfully",
            });
        }
        catch (error) {
            this.logger.error("Calling deleteCategory()", error, CategoryController_1.name);
            res.status(error.status).json({
                status: common_enum_1.ApiResponseStatus.FAILURE,
                message: error.message,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: [category_dto_1.CategoryDTO],
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: category_dto_1.CategoryDTO,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, category_add_dto_1.CategoryAddDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, category_update_dto_1.CategoryUpdateDTO, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiResponse)({
        status: 200,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = CategoryController_1 = __decorate([
    (0, common_1.Controller)("categories"),
    (0, swagger_1.ApiTags)("categories"),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        common_1.Logger])
], CategoryController);
//# sourceMappingURL=category.controller.js.map