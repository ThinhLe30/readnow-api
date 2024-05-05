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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const common_enum_1 = require("../common/enum/common.enum");
const baseUUID_enity_1 = require("./baseUUID.enity");
let User = exports.User = class User extends baseUUID_enity_1.BaseUUID {
    static _OPENAPI_METADATA_FACTORY() {
        return { authId: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String }, role: { required: true, enum: require("../common/enum/common.enum").Role }, photo: { required: false, type: () => String } };
    }
};
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "authId", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ nullable: false }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ nullable: false }),
    (0, core_1.Enum)({ items: () => common_enum_1.Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)({ tableName: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map