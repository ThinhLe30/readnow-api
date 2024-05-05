"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleLoginTypeDTO = void 0;
const openapi = require("@nestjs/swagger");
class GoogleLoginTypeDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, status: { required: true, enum: require("../../../common/enum/common.enum").ApiResponseStatus }, token: { required: true, type: () => String } };
    }
}
exports.GoogleLoginTypeDTO = GoogleLoginTypeDTO;
//# sourceMappingURL=GoogleLogin.dto.js.map