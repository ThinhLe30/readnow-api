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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const baseUUID_enity_1 = require("./baseUUID.enity");
const category_entity_1 = require("./category.entity");
let Article = exports.Article = class Article extends baseUUID_enity_1.BaseUUID {
    static _OPENAPI_METADATA_FACTORY() {
        return { author: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, url: { required: false, type: () => String }, imageURL: { required: true, type: () => String }, content: { required: true, type: () => String }, publishedAt: { required: true, type: () => Date }, category: { required: true, type: () => require("./category.entity").Category } };
    }
};
__decorate([
    (0, core_1.Property)({ nullable: false }),
    __metadata("design:type", String)
], Article.prototype, "author", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false, columnType: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, columnType: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "url", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false, columnType: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "imageURL", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, columnType: 'longtext' }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false }),
    __metadata("design:type", Date)
], Article.prototype, "publishedAt", void 0);
__decorate([
    (0, core_1.OneToOne)(),
    __metadata("design:type", category_entity_1.Category)
], Article.prototype, "category", void 0);
exports.Article = Article = __decorate([
    (0, core_1.Entity)({ tableName: 'articles' })
], Article);
//# sourceMappingURL=article.entity.js.map