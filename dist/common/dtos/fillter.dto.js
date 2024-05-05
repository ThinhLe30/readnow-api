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
exports.FilterMessageDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_enum_1 = require("../enum/common.enum");
class FilterMessageDTO {
    constructor() {
        this.pageNo = common_enum_1.Constant.DEFAULT_PAGENO;
        this.sortField = ["id"];
        this.sortDir = common_enum_1.Constant.DEFAULT_SORTDIR;
        this.keyword = common_enum_1.Constant.DEFAULT_KEYWORD;
        this.limit = common_enum_1.Constant.DEFAULT_LIMIT;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { pageNo: { required: false, type: () => Number, default: common_enum_1.Constant.DEFAULT_PAGENO }, sortField: { required: false, type: () => [String], default: ["id"] }, sortDir: { required: false, type: () => String, default: common_enum_1.Constant.DEFAULT_SORTDIR, enum: ["asc", "desc"] }, keyword: { required: false, type: () => String, default: common_enum_1.Constant.DEFAULT_KEYWORD }, limit: { required: false, type: () => Number, default: common_enum_1.Constant.DEFAULT_LIMIT } };
    }
}
exports.FilterMessageDTO = FilterMessageDTO;
__decorate([
    (0, class_validator_1.Validate)((_, value) => value > 0, { message: "pageNo must be bigger 0" }),
    (0, class_validator_1.IsInt)({ message: "pageNo must be an integer" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FilterMessageDTO.prototype, "pageNo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FilterMessageDTO.prototype, "sortField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["asc", "desc"], {
        message: "sortDir must be one of asc, desc",
    }),
    __metadata("design:type", String)
], FilterMessageDTO.prototype, "sortDir", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMessageDTO.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.Validate)((_, value) => value > 0, { message: "limit must be bigger 0" }),
    (0, class_validator_1.IsInt)({ message: "limit must be an integer" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FilterMessageDTO.prototype, "limit", void 0);
//# sourceMappingURL=fillter.dto.js.map