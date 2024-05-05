"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireBaseAuthDTO = void 0;
const openapi = require("@nestjs/swagger");
class FireBaseAuthDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, role: { required: true, enum: require("../../../common/enum/common.enum").Role }, accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } };
    }
}
exports.FireBaseAuthDTO = FireBaseAuthDTO;
//# sourceMappingURL=LoginResponse.dto.js.map