"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class GetUserResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, status: { required: true, type: () => Number }, data: { required: true, type: () => require("../../dtos/update-current-user.dto").UpdateCurrentUserDTO } };
    }
}
exports.GetUserResponseDto = GetUserResponseDto;
//# sourceMappingURL=get-user-response.dto.js.map